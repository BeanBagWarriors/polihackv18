const Instance = require("../models/instanceModel");

exports.registerGCPInstance = async (req, res) => {
  try {
    const { userId, gcpInstanceId, dockerImage, publicIp } = req.body;

    if (!userId || !gcpInstanceId || !dockerImage) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: userId, gcpInstanceId, dockerImage",
      });
    }

    const instance = await Instance.create({
      userId,
      originalInstanceId: gcpInstanceId,
      dockerImage,
      publicIp: publicIp || null,
      region: "google-cloud",
      status: "pending",        // ENUM VALID
      // failoverProvider → AWS automat (model default)
    });

    return res.json({
      ok: true,
      message: "GCP Instance registered successfully.",
      instance,
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: err.toString(),
    });
  }
};
