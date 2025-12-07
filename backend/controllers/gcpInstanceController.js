const Instance = require("../models/instanceModel");

exports.registerGCPInstance = async (req, res) => {
  try {
    const { userId, gcpInstanceId, dockerImage, dns, publicIp, healthUrl } = req.body;

    console.log(userId, gcpInstanceId, dockerImage);

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

    if (!healthUrl) {
      return res.status(400).json({
        ok: false,
        error: "Must provide healthUrl for health checks",
      });
    }

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
    console.error("ERROR registerGCPInstance:", err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};

exports.getUserInstances = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        ok: false,
        error: "Missing userId parameter",
      });
    }

    const instances = await Instance.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      ok: true,
      instances,
    });

  } catch (err) {
    console.error("ERROR getUserInstances:", err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};

exports.deleteInstance = async (req, res) => {
  try {
    const { instanceId } = req.params;

    if (!instanceId) {
      return res.status(400).json({
        ok: false,
        error: "Missing instanceId parameter",
      });
    }

    const instance = await Instance.findByIdAndDelete(instanceId);

    if (!instance) {
      return res.status(404).json({
        ok: false,
        error: "Instance not found",
      });
    }

    return res.json({
      ok: true,
      message: "Instance deleted successfully.",
    });

  } catch (err) {
    console.error("ERROR deleteInstance:", err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};
