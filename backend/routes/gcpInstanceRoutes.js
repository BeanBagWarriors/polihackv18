const express = require("express");
const { registerGCPInstance, getUserInstances, deleteInstance } = require("../controllers/gcpInstanceController");
const { failGCPInstance } = require("../controllers/failGcpInstance");

const router = express.Router();

router.post("/register", registerGCPInstance);
router.post("/fail", failGCPInstance);
router.get("/instances/:userId", getUserInstances);
router.delete("/instance/:instanceId", deleteInstance);

module.exports = router;
