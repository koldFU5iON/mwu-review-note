import { app, BrowserWindow, globalShortcut } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url';

import { ipcMain } from 'electron';
import { saveNote } from './utils/saveNote.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

ipcMain.on('save-note', (event, data) => {
  saveNote(data);
});

console.log('🔍 preload path:', path.join(__dirname, 'preload.js'));

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    show: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false, 
      preload: path.join(__dirname, 'preload.js'),
    }
    
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // Register global hotkey
  globalShortcut.register('Ctrl+Alt+Space', () => {
    console.log('🔥 Ctrl+Shift+Space pressed!');
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
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
