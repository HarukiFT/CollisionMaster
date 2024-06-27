const express = require('express')
const MainWindow = require('../classes/mainWindow')
const AppRouter = require('../routes/appRouter')

class AppServer {
    #app
    #connection

    #httpPort
    #status

    constructor(port) {
        this.#app = express()
        this.#app.use(express.json())
        this.#httpPort = port

        this.#app.use(new AppRouter(this.#app).getRoutes())

        this.#updateStatus(0)
    }

    getStatus() {
        return this.#status
    }

    #updateStatus(newStatus) {
        this.#status = newStatus
        MainWindow.getWindow().webContents.send('app:status', newStatus)
    }

    start() {
        this.#connection = this.#app.listen(this.#httpPort, () => {
            this.#updateStatus(1)
        })
    }

    stop() {
        if (this.#connection) {
            this.#connection.close()
            this.#connection = null

            this.#updateStatus(0)
        }        
    }
}

module.exports = AppServer