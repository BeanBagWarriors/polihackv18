const axios = require("axios");
const Instance = require("../models/instanceModel");
const {
  createEC2FailoverInstance,
  terminateAWSInstance
} = require("../controllers/instanceController");

const INTERVAL = 1000;   // check every second
const MAX_FAILS = 3;
const START_DELAY = 5000;

// prevent running failover multiple times
const failoverLock = new Set();

console.log("⏳ HealthChecker will start in 5 seconds...");

setTimeout(() => {
  console.log("🔥 HealthChecker started...\n");

  setInterval(async () => {
    try {
      const instances = await Instance.find({
        provider: "gcp",
        healthUrl: { $exists: true, $ne: null }
      });

      for (const inst of instances) {
        const id = inst.originalInstanceId;
        const url = inst.healthUrl;

        // =========================
        // 🔍 SIMPLE HEALTH CHECK
        // =========================
        let healthy = true;

        try {
          // any status < 500 counts as alive
          const res = await axios.get(url, {
            timeout: 1500,
            validateStatus: () => true
          });

          if (res.status >= 500) healthy = false;
        } catch {
          healthy = false;
        }

        // =========================
        // 🟢 ONLINE
        // =========================
        if (healthy) {
          if (inst.status !== "running" || inst.failCount !== 0) {
            console.log(`🟢 ONLINE (reset): ${id}`);
            inst.status = "running";
            inst.failCount = 0;

            // if AWS failover existed → TERMINATE it
            if (inst.awsData?.instanceId) {
              console.log(`💀 Terminating AWS failover instance for ${id}`);
              try {
                await terminateAWSInstance(inst.awsData.instanceId);
                inst.awsData = null;
                failoverLock.delete(inst._id.toString());
              } catch (err) {
                console.error("❌ Error terminating AWS instance:", err);
              }
            }

            await inst.save();
          } else {
            console.log(`🟢 ONLINE: ${id}`);
          }

          // allow future failover
          failoverLock.delete(inst._id.toString());
          continue;
        }

        // =========================
        // 🔴 OFFLINE
        // =========================
        inst.failCount += 1;
        console.log(`🔴 FAIL ${inst.failCount}/${MAX_FAILS}: ${id}`);

        // not final fail yet
        if (inst.failCount < MAX_FAILS) {
          await inst.save();
          continue;
        }

        // =========================
        // 🚨 FINAL FAIL
        // =========================
        if (inst.status !== "failed") {
          console.log(`🚨 FINAL FAIL — marking failed: ${id}`);
          inst.status = "failed";
          await inst.save();
        }

        // failover already triggered?
        if (failoverLock.has(inst._id.toString())) {
          continue;
        }

        // lock to prevent duplicates
        failoverLock.add(inst._id.toString());

        // trigger failover in background
        (async () => {
          try {
            console.log(`⚡ FAILOVER START: ${id}`);
            const awsData = await createEC2FailoverInstance(inst);

            inst.awsData = awsData;
            await inst.save();

            console.log(`⚡ FAILOVER COMPLETE: ${id}`);
          } catch (err) {
            console.error("❌ Failover error:", err);
          }
        })();

      }

    } catch (err) {
      console.error("❌ HealthChecker error:", err);
    }
  }, INTERVAL);

}, START_DELAY);
