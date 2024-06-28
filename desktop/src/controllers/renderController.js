class RenderController {
    #appServer

    constructor(appServer) {
        this.#appServer = appServer
    }

    handleCreate(req, res) {
        // Projecting on 2D
        const { a, b } = req.body
        const width = Math.abs(a.x - b.x)
        const height = Math.abs(a.z - b.z)

        const result = this.#appServer.createCanvas(width, height)

        if (result) {
            return res.sendStatus(200)
        }

        return res.sendStatus(403)
    }

    handleSet(req, res) {
        const {x, y, depth} = req.body

        const result = this.#appServer.setPixel(x, y, depth)

        if (result) {
            return res.sendStatus(200)
        }
        
        return res.sendStatus(403)
    }
}

module.exports = RenderController