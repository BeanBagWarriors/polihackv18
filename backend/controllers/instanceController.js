import dotenv from "dotenv";
dotenv.config();

import {
  EC2Client,
  RunInstancesCommand,
  CreateTagsCommand,
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand,
  DescribeSecurityGroupsCommand
} from "@aws-sdk/client-ec2";

const AWS_REGION = process.env.AWS_REGION || "eu-central-1";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const ec2 = new EC2Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

function generateUserData() {
  const GHCR_USERNAME = "00alexo";
  const GHCR_IMAGE = "infobase";
  const GHCR_TAG = "latest";
  const GHCR_PAT = ""; // dacă repo e privat, pui token aici

  const script = `#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

${GHCR_PAT ? `echo "${GHCR_PAT}" | sudo docker login ghcr.io -u ${GHCR_USERNAME} --password-stdin` : "# Public repo, skip login"}

# Pull imagine
sudo docker pull ghcr.io/${GHCR_USERNAME}/${GHCR_IMAGE}:${GHCR_TAG}

# Log imagini
sudo docker images > /var/log/docker-images.txt

# PORNIM containerul (frontend 3000 + backend 4000)
sudo docker run -d \
  --name infobase-app \
  -p 3000:3000 \
  -p 4000:4000 \
  ghcr.io/${GHCR_USERNAME}/${GHCR_IMAGE}:${GHCR_TAG} \
  > /var/log/docker-run.txt 2>&1

echo "DONE" > /var/log/deploy-status.txt
`;

  return Buffer.from(script).toString("base64");
}



// -------------------------------------------------------------
// 1. Returnează SG existent sau îl creează dacă nu există
// -------------------------------------------------------------
async function getOrCreateSecurityGroup() {
  const groupName = "my-ec2-sg";

  console.log("🔍 Verific dacă există Security Group...");

  try {
    const existing = await ec2.send(
      new DescribeSecurityGroupsCommand({
        GroupNames: [groupName],
      })
    );

    if (existing.SecurityGroups.length > 0) {
      console.log("✔️ Security Group există deja:", existing.SecurityGroups[0].GroupId);
      return existing.SecurityGroups[0].GroupId;
    }
  } catch (err) {
    if (err.Code !== "InvalidGroup.NotFound") {
      throw err;
    }
  }

  console.log("📦 Creez Security Group nou...");

  const createSg = await ec2.send(
    new CreateSecurityGroupCommand({
      GroupName: groupName,
      Description: "Security group pentru test EC2",
    })
  );

  const sgId = createSg.GroupId;
  console.log("🔐 Creat SG cu ID:", sgId);

  // Deschidem porturile
await ec2.send(
  new AuthorizeSecurityGroupIngressCommand({
    GroupId: sgId,
    IpPermissions: [
      {
        IpProtocol: "tcp",
        FromPort: 22,
        ToPort: 22,
        IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      },
      {
        IpProtocol: "tcp",
        FromPort: 3000,
        ToPort: 3000,
        IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      },
      {
        IpProtocol: "tcp",
        FromPort: 4000,
        ToPort: 4000,
        IpRanges: [{ CidrIp: "0.0.0.0/0" }],
      }
    ],
  })
);


  console.log("🔓 Porturile deschise!");
  return sgId;
}

// -------------------------------------------------------------
// 2. Creează instanța EC2
// -------------------------------------------------------------
async function createEC2Instance() {
  try {
    const sgId = await getOrCreateSecurityGroup();

    console.log("🚀 Creez instanța EC2...");

    const command = new RunInstancesCommand({
      ImageId: "ami-06dd92ecc74fdfb36",
      InstanceType: "t3.micro",
      MinCount: 1,
      MaxCount: 1,
      KeyName: "mykey",
      SecurityGroupIds: [sgId],
      UserData: generateUserData(),
    });

    const response = await ec2.send(command);

    const instanceId = response.Instances[0].InstanceId;
    console.log("🆔 Instance ID:", instanceId);

    await ec2.send(
      new CreateTagsCommand({
        Resources: [instanceId],
        Tags: [{ Key: "Name", Value: "my-test-instance" }],
      })
    );

    console.log("✨ Instanță creată cu succes!");

    return instanceId;
  } catch (error) {
    console.error("❌ Eroare la crearea instanței:", error);
  }
}

createEC2Instance();
