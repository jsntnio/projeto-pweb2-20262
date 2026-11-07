import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { getToken } from '../api/client'

export function ProtectedRoute() {
    const tokenDoStore = useAppSelector((state) => state.auth.token)
    const token = tokenDoStore ?? getToken()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}