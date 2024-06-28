const { Router } = require("express")
const RouterBase = require("./routerBase")
const ConfigController = require("../controllers/configController")

class ConfigRouter extends RouterBase{
    constructor (appServer) {
        super(appServer)
    }

    getRoutes() {
        const router = Router()

        const configController = new ConfigController(this._appServer)

        router.get('/connect', (req, res) => {
            configController.handleConnect(req, res)
        })

        router.get('/disconnect', (req, res) => {
            configController.handleDisconnect(req, res)
        })

        return router
    }
}

module.exports = ConfigRouter