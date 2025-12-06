// dns-switch.js
// Script care schimbă DNS-ul în Cloudflare între GCP și AWS pentru visionsite.pro

const axios = require("axios");

// =========================
// CONFIG
// =========================

// IP-urile serverelor tale
const GCP_IP = "34.1.7.25";       // IP Google Cloud
const AWS_IP = "18.184.12.195";   // IP AWS

// Cloudflare
const CF_API_TOKEN = "PPGw9W55YFx6TmWzo0eFWOv3JWy1Uq4YvupmwsZY";
const CF_ZONE_ID = "f4e185ff89b311b51fcab68e63893d5c";

// Numele recordului pe care îl modifici
const DNS_NAME = "visionsite.pro";

// =========================
// Helper: găsește automat ID-ul recordului A
// =========================
async function getRecordId() {
  const url = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records?type=A&name=${encodeURIComponent(DNS_NAME)}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
    },
  });

  if (!res.data.success || !res.data.result || res.data.result.length === 0) {
    throw new Error(`Nu am găsit niciun A record pentru ${DNS_NAME} în Cloudflare.`);
  }

  // Luăm primul record găsit
  const record = res.data.result[0];
  return record.id;
}

// =========================
// Update DNS
// =========================
async function updateDNS(targetIp) {
  try {
    const recordId = await getRecordId();

    const url = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records/${recordId}`;

    const payload = {
      type: "A",
      name: DNS_NAME,
      content: targetIp,
      ttl: 60,       // Auto
      proxied: false
    };

    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.success) {
      console.log(`DNS UPDATED → ${DNS_NAME} acum pointează la ${targetIp}`);
    } else {
      console.error("Eroare Cloudflare:", response.data);
    }
  } catch (err) {
    console.error(
      "Eroare la apelul API Cloudflare:",
      err.response?.data || err.message
    );
  }
}

// =========================
// CLI: node dns-switch.js gcp / aws
// =========================
async function main() {
  const arg = process.argv[2];

  if (!arg || !["gcp", "aws"].includes(arg)) {
    console.log("Folosește:");
    console.log("  node dns-switch.js gcp");
    console.log("  node dns-switch.js aws");
    process.exit(1);
  }

  if (arg === "gcp") {
    console.log("Schimb DNS → GCP");
    await updateDNS(GCP_IP);
  } else if (arg === "aws") {
    console.log("Schimb DNS → AWS");
    await updateDNS(AWS_IP);
  }
}

main();
