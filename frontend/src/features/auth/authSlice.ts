import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, restaurarSessaoThunk, logoutThunk, cadastroThunk } from './authThunks'
import type { UsuarioLogado } from '../../types'

export interface AuthState {
    usuario: UsuarioLogado | null
    token: string | null
    carregando: boolean
    erro: string | null
    restaurandoSessao: boolean
}

const initialState: AuthState = {
    usuario: null,
    token: null,
    carregando: false,
    erro: null,
    restaurandoSessao: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(loginThunk.pending, (state) => {
            state.carregando = true
            state.erro = null
        })

        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.carregando = false
            state.token = action.payload.token
            state.usuario = action.payload.usuario
        })

        builder.addCase(loginThunk.rejected, (state, action) => {
            state.carregando = false
            state.erro = action.payload ?? 'Erro ao fazer login'
        })

        builder.addCase(restaurarSessaoThunk.pending, (state) => {
            state.restaurandoSessao = true
        })

        builder.addCase(restaurarSessaoThunk.fulfilled, (state, action) => {
            state.restaurandoSessao = false
            state.token = action.payload.token
            state.usuario = action.payload.usuario
        })

        builder.addCase(restaurarSessaoThunk.rejected, (state) => {
            state.restaurandoSessao = false
            state.token = null
            state.usuario = null
        })

        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.token = null
            state.usuario = null
            state.erro = null
        })

        builder.addCase(cadastroThunk.pending, (state) => {
            state.carregando = true
            state.erro = null
        })

        builder.addCase(cadastroThunk.fulfilled, (state, action) => {
            state.carregando = false
            state.token = action.payload.token
            state.usuario = action.payload.usuario
        })

        builder.addCase(cadastroThunk.rejected, (state, action) => {
            state.carregando = false
            state.erro = action.payload ?? 'Erro ao criar conta'
        })
    },
})

export const authReducer = authSlice.reducer