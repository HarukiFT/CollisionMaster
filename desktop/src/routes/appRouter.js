const { Router } = require("express")
const RouterBase = require("./routerBase")
const ConfigRouter = require("./configRouter")
const RenderRouter = require("./renderRouter")

class AppRouter extends RouterBase{
    constructor (appServer) {
        super(appServer)
    }

    getRoutes() {
        const router = Router()

        router.use('/config', new ConfigRouter(this._appServer).getRoutes())
        router.use('/render', new RenderRouter(this._appServer).getRoutes())

        return router
    }
}

module.exports = AppRouter