const { ipcMain } = require("electron")

class IpcListener {
    #appServer

    constructor(appServer) {
        this.#appServer = appServer
    }

    listen() {
        ipcMain.on('settings:server', (event, status) => {
            if (status) {
                this.#appServer.start()
            } else {
                this.#appServer.stop()
            }
        })
    }
}

module.exports = IpcListener