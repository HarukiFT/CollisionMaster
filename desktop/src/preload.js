const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  setServer: (state) => ipcRenderer.send('settings:server', state),
  onServerUpdate: (callback) => ipcRenderer.on('settings:server', (event, state) => callback(state)),

  onStatusUpdate: (callback) => ipcRenderer.on('app:status', (event, state) => callback(state)),
  onDataUpdate: (callback) => ipcRenderer.on('app:canvas_data', (event, data) => callback(data)),

  onCanvasUpdate: (callback) => ipcRenderer.on('render:new_canvas', (event, metrics) => callback(metrics)),
  onProgressUpdate: (callback) => ipcRenderer.on('render:new_progress', (event, progress) => callback(progress)),
});
