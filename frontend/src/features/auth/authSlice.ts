import { createSlice } from '@reduxjs/toolkit'
import type { UsuarioLogado } from '../../types'

export interface AuthState {
    usuario: UsuarioLogado | null
    token: string | null
    carregando: boolean
    erro: string | null
}

const initialState: AuthState = {
    usuario: null,
    token: null,
    carregando: false,
    erro: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginIniciado(state) {
            state.carregando = true
            state.erro = null
        },
        loginSucesso(state, action: { payload: { token: string; usuario: UsuarioLogado } }) {
            state.token = action.payload.token
            state.usuario = action.payload.usuario
            state.carregando = false
            state.erro = null
        },
        loginErro(state, action: { payload: string }) {
            state.carregando = false
            state.erro = action.payload
        },
        sessaoRestaurada(state, action: { payload: { token: string; usuario: UsuarioLogado } }) {
            state.token = action.payload.token
            state.usuario = action.payload.usuario
            state.carregando = false
            state.erro = null
        },
        logout(state) {
            state.token = null
            state.usuario = null
            state.carregando = false
            state.erro = null
        },
    },
})

export const {
    loginIniciado,
    loginSucesso,
    loginErro,
    sessaoRestaurada,
    logout,
} = authSlice.actions

export const authReducer = authSlice.reducer