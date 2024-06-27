const express = require('express')

class AppServer {
    #app
    #connection
    #httpPort

    constructor(port) {
        this.#app = express()
        this.#app.use(express.json())
        this.#httpPort = port
    }

    start() {
        this.#connection = this.#app.listen(this.#httpPort)
    }

    stop() {
        if (this.#connection) {
            this.#connection.close()
            this.#connection = null
        }        
    }
}

module.exports = AppServer