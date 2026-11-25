// Gives the page a small, safe bridge to desktop features
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('simpleBox', {
  isDesktop: true,
  saveFile: (name, text) => ipcRenderer.invoke('save-file', { name, text }),
  copyText: (text) => ipcRenderer.invoke('copy-text', text),
});
