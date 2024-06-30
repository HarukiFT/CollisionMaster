class RenderController {
    #appServer

    constructor(appServer) {
        this.#appServer = appServer
    }

    handleCreate(req, res) {
        // Projecting on 2D
        const { a, b, settings } = req.body
        const width = Math.ceil(Math.abs(a.x - b.x))
        const height = Math.ceil(Math.abs(a.z - b.z))

        const result = this.#appServer.createCanvas(width, height, settings)

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

    handleMultiset(req, res) {
        for (let pixelData of req.body) {
            const result = this.#appServer.setPixel(pixelData.x, pixelData.y, pixelData.depth)

            if (!result) {
                return res.sendStatus(403)
            }
        }

        res.sendStatus(200)
    }
}

module.exports = RenderController