const mongoose = require("mongoose");

const InstanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  originalInstanceId: { type: String, required: true }, 
  region: { type: String, default: "google-cloud" },

  dockerImage: { type: String, required: true },
  publicIp: { type: String, default: null },

  status: { 
    type: String, 
    enum: ["pending", "running", "stopped", "failed"], 
    default: "pending" 
  },

  failoverProvider: { type: String, default: "aws" },   // ← AUTOMATIC

  awsData: { type: Object, default: null },

  lastChecked: { type: Date, default: null },
}, { timestamps: true });


module.exports = mongoose.model("Instance", InstanceSchema);
