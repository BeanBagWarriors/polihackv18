const Instance = require("../models/instanceModel");

// Importă funcția corect din instanceController
const { createEC2FailoverInstance } = require("./instanceController");

const failGCPInstance = async (req, res) => {
  try {
    const { instanceId } = req.body;

    const instance = await Instance.findOne({ originalInstanceId: instanceId });

    if (!instance) {
      return res.status(404).json({ ok: false, error: "Instance not found" });
    }

    // Mark as FAILED
    instance.status = "failed";
    instance.failoverProvider = "aws";
    await instance.save();

    // Trigger AWS failover
    const awsData = await createEC2FailoverInstance(instance);

    // Save AWS result inside the original instance
    instance.awsData = awsData;
    instance.status = "running";
    await instance.save();

    return res.json({
      ok: true,
      message: "GCP instance FAILED → AWS failover launched!",
      failover: awsData,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.toString() });
  }
};

module.exports = { failGCPInstance };
