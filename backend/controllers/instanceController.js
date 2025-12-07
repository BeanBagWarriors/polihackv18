require("dotenv").config();
const axios = require("axios");

const {
  EC2Client,
  RunInstancesCommand,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand,
  DescribeSecurityGroupsCommand,
  AssociateAddressCommand,
  TerminateInstancesCommand,
  DisassociateAddressCommand,
  waitUntilInstanceRunning
} = require("@aws-sdk/client-ec2");

const AWS_REGION = process.env.AWS_REGION || "eu-central-1";
const ec2 = new EC2Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function updateDNS(targetIp) {
  try {
    const zoneId = process.env.CF_ZONE_ID;
    const token = process.env.CF_API_TOKEN;
    const dnsName = process.env.DNS_NAME;

    const getUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=A&name=${dnsName}`;

    const recordRes = await axios.get(getUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!recordRes.data.success || recordRes.data.result.length === 0) {
      console.error("DNS record not found in Cloudflare:", recordRes.data);
      return;
    }

    const recordId = recordRes.data.result[0].id;

    const updateUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`;

    const payload = {
      type: "A",
      name: dnsName,
      content: targetIp,
      ttl: 60,
      proxied: false
    };

    const updateRes = await axios.put(updateUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (!updateRes.data.success) {
      console.error("Error updating DNS:", updateRes.data);
    } else {
      console.log(`DNS UPDATED: ${dnsName} -> ${targetIp}`);
    }

  } catch (err) {
    console.error("DNS Switch Error:", err.response?.data || err.message);
  }
}

function generateUserData(image) {
  return Buffer.from(`#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo docker pull ${image}

sudo docker run -d \
  --name user-app \
  -p 3000:3000 \
  -p 4000:4000 \
  ${image}
`).toString("base64");
}

async function getOrCreateSecurityGroup() {
  const groupName = "my-ec2-sg";

  try {
    const existing = await ec2.send(
      new DescribeSecurityGroupsCommand({ GroupNames: [groupName] })
    );
    if (existing.SecurityGroups.length > 0) return existing.SecurityGroups[0].GroupId;
  } catch (_) {}

  const createSg = await ec2.send(
    new CreateSecurityGroupCommand({
      GroupName: groupName,
      Description: "Failover SG",
    })
  );

  const sgId = createSg.GroupId;

  await ec2.send(
    new AuthorizeSecurityGroupIngressCommand({
      GroupId: sgId,
      IpPermissions: [
        { IpProtocol: "tcp", FromPort: 22, ToPort: 22, IpRanges: [{ CidrIp: "0.0.0.0/0" }] },
        { IpProtocol: "tcp", FromPort: 3000, ToPort: 3000, IpRanges: [{ CidrIp: "0.0.0.0/0" }] },
        { IpProtocol: "tcp", FromPort: 4000, ToPort: 4000, IpRanges: [{ CidrIp: "0.0.0.0/0" }] },
      ],
    })
  );

  return sgId;
}

exports.createEC2FailoverInstance = async (instance) => {
  console.log("FAILOVER: Starting AWS instance...");

  const sgId = await getOrCreateSecurityGroup();

  const run = await ec2.send(
    new RunInstancesCommand({
      ImageId: "ami-06dd92ecc74fdfb36",
      InstanceType: "t3.micro",
      MinCount: 1,
      MaxCount: 1,
      KeyName: "mykey",
      SecurityGroupIds: [sgId],
      UserData: generateUserData(instance.dockerImage),
    })
  );

  const awsInstanceId = run.Instances[0].InstanceId;

  await waitUntilInstanceRunning(
    { client: ec2, maxWaitTime: 120 },
    { InstanceIds: [awsInstanceId] }
  );

  const allocationId = process.env.AWS_EIP_ALLOCATION_ID;
  const publicIp = process.env.AWS_IP;

  await ec2.send(
    new AssociateAddressCommand({
      InstanceId: awsInstanceId,
      AllocationId: allocationId,
    })
  );

  await updateDNS(process.env.AWS_IP);

  return {
    instanceId: awsInstanceId,
    region: AWS_REGION,
    publicIp,
    dockerImage: instance.dockerImage,
    createdAt: new Date(),
  };
};

async function terminateAWSInstance(awsInstanceId) {
  console.log(`Terminating AWS instance ${awsInstanceId}...`);

  const publicIp = process.env.AWS_IP;

  try {
    await ec2.send(
      new DisassociateAddressCommand({
        PublicIp: publicIp
      })
    );
  } catch {
    console.log("EIP was already free");
  }

  await ec2.send(
    new TerminateInstancesCommand({
      InstanceIds: [awsInstanceId],
    })
  );

  console.log("AWS instance terminated:", awsInstanceId);

  await updateDNS(process.env.GCP_IP);

  return true;
}

exports.terminateAWSInstance = terminateAWSInstance;

exports.terminateEC2Instance = async (req, res) => {
  try {
    const { instanceId } = req.body;
    await terminateAWSInstance(instanceId);

    return res.json({
      ok: true,
      message: "AWS instance terminated & DNS restored",
      instanceId
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.toString()
    });
  }
};
