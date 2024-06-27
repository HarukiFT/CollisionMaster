const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  setServer: (state) => ipcRenderer.send('settings:server', state),
  onServerUpdate: (callback) => ipcRenderer.on('settings:server', (event, state) => callback(state)),

  onStatusUpdate: (callback) => ipcRenderer.on('app:status', (event, state) => callback(state))
});
