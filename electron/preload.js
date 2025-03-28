const { contextBridge, ipcRenderer } = require("electron");

console.log("✅ preload.js has loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  saveNote: (values) => ipcRenderer.invoke("save-note", values),
  getConfig: () => ipcRenderer.invoke("get-config"),
  setConfig: (key, value) => ipcRenderer.invoke("set-config", key, value),
  loadProjects: () => ipcRenderer.invoke("load-projects"),
});
