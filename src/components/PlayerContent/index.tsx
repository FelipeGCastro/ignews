import styles from './player.module.scss'
interface PlayerContentProps {
    key: string
    imageUrl: string
    imageAlt: string
    primaryText: string
    secondaryText: string
}

export function PlayerContent ({ imageUrl, imageAlt, primaryText, secondaryText }: PlayerContentProps) {
    return (
        <div className={styles.container}>
        <img src={imageUrl} alt={imageAlt} />
        <span>{primaryText}</span>
        {secondaryText && <span>{secondaryText}</span>}
        </div>
    )
}
