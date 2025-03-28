// ✅ config.js — converted to ESM
import fs from "fs";
import path from "path";
import os from "os";

const configDir = path.join(os.homedir(), ".mwu-notes");
const configPath = path.join(configDir, "app.config.json");

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
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

export function setConfig(key, value) {
  const config = getConfig();
  config[key] = value;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
