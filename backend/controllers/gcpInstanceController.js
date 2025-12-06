const Instance = require("../models/instanceModel");

exports.registerGCPInstance = async (req, res) => {
  try {
    const { userId, gcpInstanceId, dockerImage, dns, publicIp, port } = req.body;

    if (!userId || !gcpInstanceId || !dockerImage) {
      return res.status(400).json({
        ok: false,
        error: "Missing fields: userId, gcpInstanceId, dockerImage",
      });
    }

    const selectedHost = dns || publicIp;

    if (!selectedHost) {
      return res.status(400).json({
        ok: false,
        error: "Must provide dns or publicIp",
      });
    }

    const healthUrl = `http://${selectedHost}:${port || 3000}`;

    const instance = await Instance.create({
      userId,
      originalInstanceId: gcpInstanceId,
      dockerImage,
      dns: dns || null,
      publicIp: publicIp || null,
      healthUrl,
      provider: "gcp",
      status: "running",
      failCount: 0,
    });

    return res.json({
      ok: true,
      message: "GCP instance registered successfully.",
      instance,
    });

  } catch (err) {
    console.error("❌ ERROR registerGCPInstance:", err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};
