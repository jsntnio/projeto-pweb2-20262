import { Link } from 'react-router-dom'
import { LuSearchX } from 'react-icons/lu'
import styles from './NotFound.module.css'

export function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <LuSearchX size={64} strokeWidth={1.5} />
            </div>

            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Página não encontrada</h2>

            <p className={styles.description}>
                Ops! O link que você acessou pode estar quebrado ou o anúncio que você procura pode ter sido removido.
            </p>

            <Link to="/vendas" className={styles.button}>
                Voltar para vendas
            </Link>
        </div>
    )
}