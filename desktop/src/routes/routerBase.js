const { Router } = require("express")

class RouterBase {
    _appServer
    constructor (appServer) {
        this._appServer = appServer
    }

    getRoutes() {
        return Router()
    }
}

module.exports = RouterBase