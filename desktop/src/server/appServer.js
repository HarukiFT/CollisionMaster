const express = require('express')
const MainWindow = require('../classes/mainWindow')
const AppRouter = require('../routes/appRouter')
const Canvas = require('../classes/canvas')

class AppServer {
    #app
    #connection

    #httpPort
    #status

    #canvas

    constructor(port) {
        this.#app = express()
        this.#app.use(express.json())
        this.#httpPort = port

        this.#app.use(new AppRouter(this).getRoutes())

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

    connect() {
        if (this.#status != 1) { return false }

        this.#canvas = undefined
        this.#updateStatus(2)
        
        return true
    }

    disconnect() {
        this.#canvas = undefined
        this.#updateStatus(1)

        return true
    }

    stop() {
        if (this.#connection) {
            this.#connection.close()
            this.#connection = null

            this.#updateStatus(0)
        }        
    }

    createCanvas(width, height) {
        if (this.#status != 2 ) { return }

        this.#canvas = new Canvas(width, height)
        return true;
    }

    setPixel(x, y, depth) {
        if (this.#status != 2 || !this.#canvas) { return }

        this.#canvas.setPixel(x, y, depth)
        return true
    }
}

module.exports = AppServer