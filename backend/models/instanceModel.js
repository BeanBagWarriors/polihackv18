const mongoose = require("mongoose");

const InstanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // ID-ul instanței originale din GCP
  originalInstanceId: { type: String, required: true },

  // unde rulează în prezent aplicația
  dockerImage: { type: String, required: true },

  // DNS preferat, IP fallback
  dns: { type: String, default: null },
  publicIp: { type: String, default: null },

  // URL folosit pentru health-check
  healthUrl: { type: String, required: true },

  // GCP / AWS
  provider: { type: String, enum: ["gcp", "aws"], default: "gcp" },

  // failover provider
  failoverProvider: { type: String, enum: ["aws"], default: "aws" },

  // AWS data salvată după failover
  awsData: {
    instanceId: String,
    region: String,
    publicIp: String,
    dockerImage: String,
    createdAt: Date,
  },

  // status health
  status: {
    type: String,
    enum: ["running", "failed", "recovering"],
    default: "running",
  },

  // health fail count
  failCount: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("Instance", InstanceSchema);
