import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { restaurarSessaoThunk } from './features/auth/authThunks'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  const dispatch = useAppDispatch()
  const { restaurandoSessao } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(restaurarSessaoThunk())
  }, [dispatch])

  if (restaurandoSessao) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Carregando...</p>
      </div>
    )
  }

  return <AppRoutes />
}