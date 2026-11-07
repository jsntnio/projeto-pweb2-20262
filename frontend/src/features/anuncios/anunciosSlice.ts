import { createSlice } from '@reduxjs/toolkit'
import type { Anuncio } from '../../types'

export interface AnunciosState {
    detalhe: Anuncio | null
    carregando: boolean
    erro: string | null
}

const initialState: AnunciosState = {
    detalhe: null,
    carregando: false,
    erro: null,
}

const anunciosSlice = createSlice({
    name: 'anuncios',
    initialState,
    reducers: {
        buscarIniciado(state) {
            state.carregando = true
            state.erro = null
        },
        buscarSucesso(state, action: { payload: Anuncio }) {
            state.detalhe = action.payload
            state.carregando = false
            state.erro = null
        },
        buscarErro(state, action: { payload: string }) {
            state.carregando = false
            state.erro = action.payload
        },
        limparDetalhe(state) {
            state.detalhe = null
            state.carregando = false
            state.erro = null
        },
    },
})

export const {
    buscarIniciado,
    buscarSucesso,
    buscarErro,
    limparDetalhe,
} = anunciosSlice.actions

export const anunciosReducer = anunciosSlice.reducer