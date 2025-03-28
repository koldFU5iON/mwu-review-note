// electron/config.js
import fs from "fs";
import path from "path";
import os from "os";

const configDir = path.join(os.homedir(), ".mwu-notes");
const configPath = path.join(configDir, "app.config.json");

// Initialize if missing
function initConfig() {
  if (!fs.existsSync(configPath)) {
    const defaultConfig = {
      defaultProjectDirectory: path.join(
        os.homedir(),
        "Documents",
        "MWU Notes"
      ),
      autoSave: true,
      lastOpenedProject: null,
    };
    fs.mkdirSync(configDir, { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  }
}

export function getConfig() {
  initConfig();
  const data = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(data);
}

export function setConfig(key, value) {
  const config = getConfig();
  config[key] = value;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
