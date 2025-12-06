const express = require("express");
const { createEC2FailoverInstance } = require("../controllers/instanceController");

const router = express.Router();

router.post("/create", createEC2FailoverInstance);

module.exports = router;
