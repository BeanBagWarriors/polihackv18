const util = require("util");
const { exec } = require("child_process");
const execAsync = util.promisify(exec);

const PROJECT = "psyched-ceiling-480407-t9";
const ZONE = "europe-west9-a";
const INSTANCE = "insta1";

async function startVM() {
  console.log("Pornesc instanța...");
  await execAsync(
    `gcloud compute instances start ${INSTANCE} --zone ${ZONE} --project ${PROJECT}`
  );
  console.log("Instanța a pornit!");
}

async function getExternalIP() {
  const cmd = `gcloud compute instances describe ${INSTANCE} --zone ${ZONE} --format="get(networkInterfaces[0].accessConfigs[0].natIP)"`;
  const { stdout } = await execAsync(cmd);
  return stdout.trim();
}

async function installSoftware() {
  console.log("Rulez comenzi în VM...");

  const sshCommand = `sudo apt-get install -y nodejs && echo 'UPDATE TERMINAT'`;

  const cmd = `gcloud compute ssh ${INSTANCE} --zone ${ZONE} --command "${sshCommand}"`;

  const { stdout, stderr } = await execAsync(cmd);
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);

  console.log("Comanda a rulat cu succes!");
}

async function main() {
  await startVM();
  console.log("Aflu IP-ul...");
  const ip = await getExternalIP();
  console.log("IP extern VM:", ip);

  await installSoftware();

  console.log("GATA – scriptul a terminat.");
}

main().catch(console.error);
