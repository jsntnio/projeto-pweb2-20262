import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth'
import { setToken, clearToken, STORAGE_KEYS, ApiError } from '../../api/client'
import type { LoginPayload, SessaoResposta, UsuarioLogado, CadastroPayload } from '../../types'

export const loginThunk = createAsyncThunk<
    SessaoResposta,
    LoginPayload,
    { rejectValue: string }
>('auth/login', async (dados, { rejectWithValue }) => {
    try {
        const resposta = await authApi.login(dados)
        setToken(resposta.token)
        localStorage.setItem(STORAGE_KEYS.usuario, JSON.stringify(resposta.usuario))
        return resposta
    } catch (erro) {
        if (erro instanceof ApiError) {
            return rejectWithValue(erro.message)
        }
        return rejectWithValue('Erro ao fazer login. Tente novamente.')
    }
})

export const cadastroThunk = createAsyncThunk<
    SessaoResposta,
    CadastroPayload,
    { rejectValue: string }
>('auth/cadastro', async (dados, { rejectWithValue }) => {
    try {
        const resposta = await authApi.cadastro(dados)
        setToken(resposta.token)
        localStorage.setItem(STORAGE_KEYS.usuario, JSON.stringify(resposta.usuario))
        return resposta
    } catch (erro) {
        if (erro instanceof ApiError) {
            return rejectWithValue(erro.message)
        }
        return rejectWithValue('Erro ao criar conta. Tente novamente.')
    }
})

export const restaurarSessaoThunk = createAsyncThunk<
    { token: string; usuario: UsuarioLogado },
    void,
    { rejectValue: void }
>('auth/restaurarSessao', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(STORAGE_KEYS.token)
    const usuarioJson = localStorage.getItem(STORAGE_KEYS.usuario)

    if (!token || !usuarioJson) {
        return rejectWithValue(undefined)
    }

    try {
        const usuarioAtualizado = await authApi.getUsuarioLogado()
        return { token, usuario: usuarioAtualizado }
    } catch (erro) {
        clearToken()
        return rejectWithValue(undefined)
    }
})

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    clearToken()
})