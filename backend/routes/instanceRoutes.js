const express = require("express");
const { createEC2FailoverInstance, terminateEC2Instance } = require("../controllers/instanceController");

const router = express.Router();

router.post("/create", async (req, res) => {
  // wrapper because original function expects instance object, not req
  try {
    const instance = req.body; // must contain dockerImage etc.
    const data = await createEC2FailoverInstance(instance);
    return res.json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.toString() });
  }
});

// NEW ENDPOINT FOR TERMINATE
router.post("/terminate", terminateEC2Instance);

module.exports = router;
