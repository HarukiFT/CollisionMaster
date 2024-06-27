import { useEffect, useState } from 'react'
import Styles from '../styles/Settings.module.scss'
import { useAppContext } from '../contexts/AppContext'

const Statuses = [
    'остановлен',
    'ожидание',
    'подключен',
]

export default () => {
    const appContext = useAppContext()
    const [serverState, setServerState] = useState(false)

    const handleServerAction = () => {
        setServerState(!serverState)
    }

    useEffect(() => {
        window.electron.setServer(serverState)
    }, [serverState])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.statusBlock}>
                <div state={appContext.status} className={Styles.statusIcon}/>
                <p className={Styles.statusLabel}>Статус: {Statuses[appContext.status]}</p>
            </div>

            <div className={Styles.divider}/>

            <div className={Styles.actions}>
                <input type='button' onClick={handleServerAction} className={Styles.actionButton} value={serverState ? 'Остановить' : 'Запустить'}/>
            </div>
        </div>
    )
}