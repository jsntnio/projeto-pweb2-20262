import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LuLogOut, LuMenu, LuX, LuPlus } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import { clearToken } from '../../api/client'
import styles from './Header.module.css'

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const usuario = useAppSelector((state) => state.auth.usuario)
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  function handleLogout() {
    dispatch(logout())
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/vendas" className={styles.logoLink} onClick={fecharMenu}>
          <img
            src="/assets/images/logo.svg"
            alt="Marketplace IFPB Cajazeiras"
            className={styles.logoImage}
          />
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuAberto((v) => !v)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          {menuAberto ? <LuX size={28} /> : <LuMenu size={28} />}
        </button>
        <nav
          id="menu-principal"
          className={`${styles.nav} ${menuAberto ? styles.navAberta : ''}`}
        >
          <div className={styles.navLinks}>
            <NavLink
              to="/vendas"
              onClick={fecharMenu}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkAtivo}` : styles.navLink
              }
            >
              Vendas
            </NavLink>
            <NavLink
              to="/doacoes"
              onClick={fecharMenu}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkAtivo}` : styles.navLink
              }
            >
              Doações
            </NavLink>
            <NavLink
              to="/anuncios/novo"
              onClick={fecharMenu}
              className={styles.btnAnunciar}
            >
              <LuPlus size={18} />
              Anunciar
            </NavLink>
          </div>
          <div className={styles.usuarioArea}>
            {usuario && (
              <Link to="/perfil" className={styles.perfilPill} onClick={fecharMenu}>
                {usuario.fotoUrl ? (
                  <img
                    src={usuario.fotoUrl}
                    alt={usuario.nome}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {usuario.nome.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className={styles.usuarioNome}>{usuario.nome}</span>
              </Link>
            )}
            <button type="button" className={styles.sair} onClick={handleLogout} title="Sair">
              <LuLogOut size={18} aria-hidden="true" />
              <span className={styles.sairTexto}>Sair</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}