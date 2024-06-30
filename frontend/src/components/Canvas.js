import { useEffect, useRef } from "react"
import { useAppContext } from "../contexts/AppContext"

export default () => {
    const appContext = useAppContext()
    const canvasRef = useRef()

    useEffect(() => {
        const context = canvasRef.current.getContext('2d')

        console.log(appContext.canvasData)  
        for (let i = 0; i < appContext.canvasData.length; i++) {
            for (let j = 0; j < appContext.canvasData[i].length; j++) {
                console.log(appContext.canvasData[i][j])
                context.fillStyle = appContext.canvasData[i][j] ? '#009900' : '#000'
                context.fillRect(i, j, 1, 1)
            }
        } 
    }, [appContext.canvasData])

    return (
        <canvas ref={canvasRef} style={{
            width:  appContext.canvasData[0].length,
            height: appContext.canvasData.length
        }}>

        </canvas>
    )
}