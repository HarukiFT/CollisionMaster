const express = require('express')

class AppServer {
    #app
    #httpPort

    constructor(port) {
        this.#app = express()
        this.#app.use(express.json())
        this.#httpPort = port
    }

    start() {
        this.#app.post('/new', (req, res) => {
            
        })

        this.#app.listen(this.#httpPort, () => {
            console.log('123')
        })
    }
}

module.exports = AppServer