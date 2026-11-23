import styles from './Loading.module.css'

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'white'
    fullPage?: boolean
}

export function Loading({ size = 'md', color = 'primary', fullPage = false }: LoadingProps) {
    const spinner = (
        <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} role="status" aria-label="Carregando" />
    )

    if (fullPage) {
        return <div className={styles.fullPage}>{spinner}</div>
    }

    return <div className={styles.inline}>{spinner}</div>
}