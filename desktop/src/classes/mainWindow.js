const { config } = require("dotenv");
const { BrowserWindow } = require("electron");
const path = require('path');
const endPoints = require("../config/endPoints");

config()

class MainWindow {
    static #window;

    constructor () {
        if (MainWindow.#window) { return MainWindow.#window }
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 400,
            webPreferences: {
                preload: path.join(__dirname, '..', 'preload.js'),
            },
        });

        mainWindow.removeMenu()

        if (process.env.isDev) {
            mainWindow.loadURL(endPoints.devReact)
            mainWindow.webContents.openDevTools()
        } else {
            mainWindow.loadFile(path.join(__dirname, 'index.html'));
        }

        MainWindow.#window = mainWindow
    }

    static getWindow() {
        return this.#window;
    }
}

module.exports = MainWindow