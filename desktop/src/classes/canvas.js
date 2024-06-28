// Class that contains each pixel data

class Canvas {
    #data
    #width
    #height
    #setted

    get width() {
        return this.#width
    }

    get height() {
        return this.#height
    }
    
    constructor (width, height) {
        this.#data = Array(height).fill().map(() => Array(width).fill());
        this.#height = height
        this.#width = width
        this.#setted = 0
    }

    setPixel(x, y, depth) {
        this.#data[y][x] = depth

        this.#setted += 1
    }

    getProgress() {
        return [this.#setted, this.width * this.height]
    }
}

module.exports = Canvas