import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [status, setStatus] = useState(0)

    useEffect(() => {
        window.electron.onStatusUpdate((status) => {
            setStatus(status)
        })
    }, [])

    const payload = {
        status,
        setStatus
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