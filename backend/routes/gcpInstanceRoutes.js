const express = require("express");
const { registerGCPInstance } = require("../controllers/gcpInstanceController");
const { failGCPInstance } = require("../controllers/failGcpInstance");

const router = express.Router();

router.post("/register", registerGCPInstance);
router.post("/fail", failGCPInstance);

module.exports = router;
