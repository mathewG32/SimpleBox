// Simple Box desktop app (Electron main process)
const { app, BrowserWindow, ipcMain, dialog, shell, clipboard } = require('electron');
const path = require('path');
const fs = require('fs/promises');

// Only one Simple Box window at a time
if (!app.requestSingleInstanceLock()) app.quit();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Simple Box',
    backgroundColor: '#0d0f13',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true, // press Alt to show the menu
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Open web links in the normal browser, never inside the app
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file:')) {
      e.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });
}

// Save a backup (.json) or a Claude export (.md) to a file the user picks
ipcMain.handle('save-file', async (event, { name, text }) => {
  const parent = BrowserWindow.fromWebContents(event.sender);
  const result = await dialog.showSaveDialog(parent, {
    defaultPath: path.join(app.getPath('documents'), String(name || 'simple-box.txt')),
  });
  if (result.canceled || !result.filePath) return null;
  await fs.writeFile(result.filePath, String(text ?? ''), 'utf8');
  return result.filePath;
});

ipcMain.handle('copy-text', (_event, text) => {
  clipboard.writeText(String(text ?? ''));
  return true;
});

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
