const { Router } = require("express")
const RouterBase = require("./routerBase")
const RenderController = require("../controllers/renderController")

class RenderRouter extends RouterBase{
    constructor (appServer) {
        super(appServer)
    }

    getRoutes() {
        const router = Router()

        const renderController = new RenderController(this._appServer)

        router.post('/create', (req, res) => {
            renderController.handleCreate(req, res)
        })

        router.post('/set', (req, res) => {
            renderController.handleSet(req, res)
        })

        return router
    }
}

module.exports = RenderRouter