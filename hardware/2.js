const axios = require("axios");

// face 3 verificări consecutive și întoarce true/false
async function checkSiteBoolean(url, attempts = 3) {
  let failCount = 0;

  for (let i = 0; i < attempts; i++) {
    try {
      await axios.get(url, { timeout: 1000 });
      // dacă o verificare reușește, considerăm site-ul ONLINE
      // poți comenta linia asta dacă vrei să verifice toate cele 3 oricum
    } catch (error) {
      failCount++;
    }
  }

  // dacă TOATE cele 3 încercări au eșuat → offline
  const isOnline = failCount < attempts;
  return isOnline;
}

// la fiecare 3 secunde rulăm check-ul și afișăm booleanul
setInterval(async () => {
  const isOnline = await checkSiteBoolean("https://visionsite.pro");
  console.log(isOnline); // true = online, false = offline
}, 3000); // 3000 ms = 3 secunde

