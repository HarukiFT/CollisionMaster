import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [status, setStatus] = useState(0)
    const [metrics, setMetrics] = useState()
    const [progress, setProgress] = useState()

    useEffect(() => {
        window.electron.onStatusUpdate((status) => {
            setStatus(status)
        })

        window.electron.onCanvasUpdate((metrics) => {
            setMetrics([metrics.width, metrics.height])
        })

        window.electron.onProgressUpdate((progress) => {
            setProgress(progress)
        })
    }, [])

    useEffect(() => {
        if (status == 0 || status == 1) {
            setMetrics(null)
            setProgress(null)
        }
    }, [status])

    const payload = {
        status,
        setStatus,

        metrics,
        setMetrics,
        
        progress,
        setProgress
    }

    return (
        <AppContext.Provider value={payload}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)

    return context
}

export {
    AppContextProvider,
    useAppContext
}