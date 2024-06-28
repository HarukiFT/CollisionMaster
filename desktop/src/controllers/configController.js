class ConfigController {
    #appServer

    constructor(appServer) {
        this.#appServer = appServer
    }

    handleConnect(req, res) {
        const result = this.#appServer.connect()

        if (result) {
            return res.sendStatus(200)
        }
        

        return res.sendStatus(403)
    }

    handleDisconnect(req, res) {
        const result = this.#appServer.disconnect()

        if (result) {
            return res.sendStatus(200)
        }

        return res.sendStatus(403)
    }

    handlePing(req, res) {
        if (this.#appServer.getStatus() != 2) {
            return res.sendStatus(403)
        }

        res.sendStatus(200)
    }
}

module.exports = ConfigController