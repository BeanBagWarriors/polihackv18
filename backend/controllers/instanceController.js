require("dotenv").config();

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


// -------------------------------------------------------------
// generateUserData()
// -------------------------------------------------------------
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


// -------------------------------------------------------------
// getOrCreateSecurityGroup()
// -------------------------------------------------------------
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
      Description: "Failover SG"
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


// -------------------------------------------------------------
// createEC2FailoverInstance()
// -------------------------------------------------------------
exports.createEC2FailoverInstance = async (instance) => {
  console.log("⚠️ FAILOVER: Starting AWS instance...");

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
    { client: ec2, maxWaitTime: 180 },
    { InstanceIds: [awsInstanceId] }
  );

  const allocationId = process.env.AWS_EIP_ALLOCATION_ID;
  const publicIp = process.env.AWS_EIP_PUBLIC_IP;

  await ec2.send(
    new AssociateAddressCommand({
      InstanceId: awsInstanceId,
      AllocationId: allocationId,
    })
  );

  return {
    instanceId: awsInstanceId,
    region: AWS_REGION,
    publicIp,
    dockerImage: instance.dockerImage,
    createdAt: new Date(),
  };
};



// ==================================================================
// INTERNAL FUNCTION: terminateAWSInstance(awsInstanceId)
// ==================================================================
async function terminateAWSInstance(awsInstanceId) {
  console.log(`💀 Terminating AWS instance ${awsInstanceId}...`);

  const publicIp = process.env.AWS_EIP_PUBLIC_IP;

  try {
    // Step 1 — Disassociate Elastic IP
    await ec2.send(
      new DisassociateAddressCommand({
        PublicIp: publicIp
      })
    );
    console.log("🔌 EIP disassociated");
  } catch {
    console.log("⚠️ EIP was not associated or already free");
  }

  // Step 2 — Terminate instance
  await ec2.send(
    new TerminateInstancesCommand({
      InstanceIds: [awsInstanceId],
    })
  );

  console.log("☠️ Instance terminated:", awsInstanceId);
  return true;
}


// -------------------------------------------------------------
// Express Endpoint wrapper (optional)
// -------------------------------------------------------------
exports.terminateEC2Instance = async (req, res) => {
  try {
    const { instanceId } = req.body;

    if (!instanceId) {
      return res.status(400).json({ ok: false, error: "Missing instanceId" });
    }

    await terminateAWSInstance(instanceId);

    return res.json({
      ok: true,
      message: "AWS instance terminated successfully",
      instanceId
    });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};


// -------------------------------------------------------------
// EXPORT INTERNAL FUNCTION FOR HEALTHCHECKER
// -------------------------------------------------------------
exports.terminateAWSInstance = terminateAWSInstance;
