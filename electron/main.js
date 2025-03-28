import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";

import { ipcMain } from "electron";
import { saveNote } from "./utils/saveNote.js";

import { getConfig, setConfig } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

import { loadProjects } from "./utils/loadProjects.js";

ipcMain.handle("load-projects", async () => {
  return loadProjects();
});

ipcMain.handle("save-note", async (event, data) => {
  saveNote(data);
  return true;
});

ipcMain.handle("get-config", () => {
  return getConfig();
});

ipcMain.handle("set-config", (_event, key, value) => {
  setConfig(key, value);
});

const config = getConfig(); // 👈 this triggers the creation
console.log("🛠 Config loaded:", config);

console.log("🔍 preload path:", path.join(__dirname, "preload.js"));

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    openDevTools: false,
    show: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5174");
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // Register global hotkey
  globalShortcut.register("Ctrl+Alt+Space", () => {
    console.log("🔥 Ctrl+Alt+Space pressed!");
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  });
});

// Clean up global shortcuts on exit
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
