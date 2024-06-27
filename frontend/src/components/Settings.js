import Styles from '../styles/Settings.module.scss'

export default () => {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.statusBlock}>
                <div state={0} className={Styles.statusIcon}/>
                <p className={Styles.statusLabel}>Статус: {'{статус}'}</p>
            </div>
            <div className={Styles.divider}/>
        </div>
    )
}