import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { Login } from '../pages/Login/Login'
import { Cadastro } from '../pages/Cadastro/Cadastro'
import { Vendas } from '../pages/Vendas/Vendas'
import { Doacoes } from '../pages/Doacoes/Doacoes'
import { AnuncioNovo } from '../pages/AnuncioNovo/AnuncioNovo'
import { AnuncioDetalhe } from '../pages/AnuncioDetalhe/AnuncioDetalhe'
import { AnuncioEditar } from '../pages/AnuncioEditar/AnuncioEditar'
import { Perfil } from '../pages/Perfil/Perfil'
import { PerfilEditar } from '../pages/PerfilEditar/PerfilEditar'
import { UsuarioDetalhe } from '../pages/UsuarioDetalhe/UsuarioDetalhe'
import { NotFound } from '../pages/NotFound/NotFound'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate to="/vendas" replace />} />
                    <Route path="/vendas" element={<Vendas />} />
                    <Route path="/doacoes" element={<Doacoes />} />
                    <Route path="/anuncios/novo" element={<AnuncioNovo />} />
                    <Route path="/anuncios/:id" element={<AnuncioDetalhe />} />
                    <Route path="/anuncios/:id/editar" element={<AnuncioEditar />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/perfil/editar" element={<PerfilEditar />} />
                    <Route path="/usuarios/:id" element={<UsuarioDetalhe />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Route>
        </Routes>
    )
}