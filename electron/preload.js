// ✅ Use require here
const { contextBridge, ipcRenderer } = require('electron');

console.log('✅ preload.js has loaded');

contextBridge.exposeInMainWorld('electronAPI', {
  saveNote: (note, filename = "") => {
    console.log('🧠 saveNote called with:', note);
    ipcRenderer.send('save-note', { note, filename });
  }
});
