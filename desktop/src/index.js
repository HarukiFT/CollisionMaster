const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const AppServer = require('./server/appServer');
const { config } = require('dotenv');
const IpcListener = require('./server/ipcListener');

config()

const appServer = new AppServer(3011)
const ipcListener = new IpcListener(appServer)

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => { 
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.removeMenu()

  if (process.env.isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }
};

// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  ipcListener.listen()

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