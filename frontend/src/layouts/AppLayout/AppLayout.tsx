import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import { clearToken } from '../../api/client'
import styles from './AppLayout.module.css'

export function AppLayout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const usuario = useAppSelector((state) => state.auth.usuario)

    function handleLogout() {
        dispatch(logout())
        clearToken()
        navigate('/login', { replace: true })
    }

    return (
        <>
            <header className={styles.header}>
                <Link to="/vendas" className={styles.logo}>
                    Marketplace IFPB
                </Link>

                <nav className={styles.nav}>
                    <Link to="/vendas" className={styles.navLink}>
                        Vendas
                    </Link>
                    <Link to="/doacoes" className={styles.navLink}>
                        Doações
                    </Link>
                    <Link to="/perfil" className={styles.navLink}>
                        Meu perfil
                    </Link>
                    {usuario && <span className={styles.usuario}>{usuario.nome}</span>}
                    <button type="button" className={styles.sair} onClick={handleLogout}>
                        Sair
                    </button>
                </nav>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    )
}