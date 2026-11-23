import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { restaurarSessaoThunk } from './features/auth/authThunks'
import { AppRoutes } from './routes/AppRoutes'
import { Loading } from './components/Loading'

export default function App() {
  const dispatch = useAppDispatch()
  const { restaurandoSessao } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(restaurarSessaoThunk())
  }, [dispatch])

  if (restaurandoSessao) {
    return <Loading fullPage />
  }

  return <AppRoutes />
}