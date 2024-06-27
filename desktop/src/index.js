const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const AppServer = require('./server/appServer');
const { config } = require('dotenv');
const IpcServer = require('./server/ipcServer');
const MainWindow = require('./classes/mainWindow');
const endPoints = require('./config/endPoints');

config()

if (require('electron-squirrel-startup')) {
  app.quit();
}

// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  new MainWindow()

  const appServer = new AppServer(endPoints.httpPort)
  const ipcServer = new IpcServer(appServer)
  ipcServer.listen()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});