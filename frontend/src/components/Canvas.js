import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../contexts/AppContext"
import Styles from '../styles/Canvas.module.scss'

export default () => {
    const appContext = useAppContext()
    const canvasRef = useRef(null)

    const [scale, setScale] = useState(1)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const [startOffset, setStartOffset] = useState(null)
    const [minMax, setMinMax] = useState([])

    const drawCanvas = () => {
        console.log(scale)

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const minValue = minMax[0]
        const maxValue = minMax[1]

        context.imageSmoothingEnabled = false;
        context.setTransform(scale, 0, 0, scale, offset.x, offset.y)
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.clearRect(-offset.x / scale, -offset.y / scale, canvas.width / scale, canvas.height / scale)

        for (let i = 0; i < appContext.canvasData.length; i++) {
            for (let j = 0; j < appContext.canvasData[i].length; j++) {
                if (appContext.canvasData[i][j]) {
                    const normalizedValue = (appContext.canvasData[i][j] - minValue) / (maxValue - minValue)
                    const shade = Math.floor(200 * normalizedValue)
                    context.fillStyle = `rgb(0, ${255 - shade}, 0)`
                } else {
                    context.fillStyle = `rgb(255, 0, 0)`
                }

                context.fillRect(i, j, 1, 1)
            }
        }
    }

    useEffect(() => {
        const values = appContext.canvasData.flat().filter(value => value !== undefined && value !== null)
        const minValue = Math.min(...values)
        const maxValue = Math.max(...values)

        setMinMax([minValue, maxValue])

        drawCanvas()
    }, [appContext.canvasData])

    useEffect(() => {
        drawCanvas()
    }, [offset, scale])

    const handleMouseDown = (event) => {
        setDragging(true)
        setStartOffset({ x: event.clientX, y: event.clientY })
    }

    const handleMouseMove = (event) => {
        if (!dragging) return

        const newOffsetX = offset.x + (event.clientX - startOffset.x)
        const newOffsetY = offset.y + (event.clientY - startOffset.y)

        setOffset({
            x: newOffsetX,
            y: newOffsetY,
        })

        setStartOffset({ x: event.clientX, y: event.clientY })
    }

    const handleMouseUp = () => {
        setDragging(false)
        setStartOffset(null)
    }

    const handleWheel = (event) => {
        const delta = Math.sign(event.deltaY)
        const scaleFactor = .5
        let newScale = scale

        if (delta > 0) {
            newScale = Math.max(.5, scale - scaleFactor)
        } else {
            newScale = scale + scaleFactor
        }

        setScale(newScale)
    }

    return (
        <div className={Styles.canvasWrapper}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
                <canvas ref={canvasRef}/>
        </div>
    )
}