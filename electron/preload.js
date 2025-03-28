// ✅ Use require here
const { contextBridge, ipcRenderer } = require("electron");

console.log("✅ preload.js has loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  saveNote: (values) => {
    console.log("🧠 saveNote called with:", values.note);
    ipcRenderer.send("save-note", values);
  },
  getConfig: () => ipcRenderer.invoke("get-config"),
  setConfig: (key, value) => ipcRenderer.invoke("set-config", key, value),
});
