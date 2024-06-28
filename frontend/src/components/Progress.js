// Progress frame

import { useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import Styles from '../styles/Progress.module.scss'

export default () => {
    const appContext = useAppContext()

    useEffect(() => {

    }, [appContext.metrics])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.statusBar}>
                <p>{appContext.progress ? `${appContext.progress[0]} / ${appContext.progress[1]}` : (appContext.metrics ? `создан канвас ${appContext.metrics[0]}x${appContext.metrics[1]}` : '...')}</p>
                {
                    appContext.progress && (
                        <div className={Styles.fillBar} style={{
                            width: `${appContext.progress[0] / appContext.progress[1] * 100}%`
                        }}/>
                    )
                }
            </div>

            <div className={Styles.canvasWrapper}>
                <div className={Styles.canvasHolder}>

                </div>
            </div>
        </div>
    )
}