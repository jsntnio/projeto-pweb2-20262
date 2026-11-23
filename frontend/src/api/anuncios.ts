import { http, buildQuery } from './client'
import type { AnuncioResumo, Pagina, BuscaParams } from '../types'

export const anunciosApi = {
    listar: (params: BuscaParams) => {
        const query = buildQuery({
            modalidade: params.modalidade,
            categoria: params.categoria,
            precoMin: params.precoMin,
            precoMax: params.precoMax,
            ordem: params.ordem,
            direcao: params.direcao,
            pagina: params.pagina,
            tamanho: params.tamanho,
        })
        return http.get<Pagina<AnuncioResumo>>(`/anuncios${query}`)
    }
}