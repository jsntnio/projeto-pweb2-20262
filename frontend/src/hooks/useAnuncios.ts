import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { anunciosApi } from '../api/anuncios'
import type { AnuncioResumo, Pagina, BuscaParams, Modalidade } from '../types'

export function useAnuncios(modalidade: Modalidade) {
    const [searchParams] = useSearchParams()
    const [dados, setDados] = useState<Pagina<AnuncioResumo> | null>(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        let ativo = true
        setCarregando(true)
        setErro(null)

        const params: BuscaParams = {
            modalidade,
            categoria: searchParams.get('categoria') || undefined,
            precoMin: searchParams.get('precoMin') ? Number(searchParams.get('precoMin')) : undefined,
            precoMax: searchParams.get('precoMax') ? Number(searchParams.get('precoMax')) : undefined,
            ordem: (searchParams.get('ordem') as any) || 'data',
            direcao: (searchParams.get('direcao') as any) || 'desc',
            pagina: searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1,
            tamanho: (Number(searchParams.get('tamanho')) as any) || 10,
        }

        anunciosApi.listar(params)
            .then((res) => {
                if (ativo) setDados(res)
            })
            .catch((e) => {
                if (ativo) setErro(e.message || 'Erro ao carregar anúncios')
            })
            .finally(() => {
                if (ativo) setCarregando(false)
            })

        return () => { ativo = false }
    }, [searchParams, modalidade])

    return { dados, carregando, erro }
}