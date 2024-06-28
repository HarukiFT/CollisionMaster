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
}

module.exports = ConfigController