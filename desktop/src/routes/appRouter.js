const { Router } = require("express")
const RouterBase = require("./routerBase")

class AppRouter extends RouterBase{
    constructor (appServer) {
        super(appServer)
    }

    getRoutes() {
        return Router()
    }
}

module.exports = AppRouter