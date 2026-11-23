import { useLayoutEffect, type ReactNode } from 'react'
import { categorias, anuncioVendaMock, anuncioDoacaoMock } from './fixtures'
import type { Pagina, AnuncioResumo } from '../types'

const cursosMock = [
    { id: 1, nome: 'Análise e Desenvolvimento de Sistemas' },
    { id: 2, nome: 'Engenharia de Controle e Automação' },
    { id: 3, nome: 'Engenharia Civil' },
    { id: 4, nome: 'Licenciatura em Matemática' },
]

const mockFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

    if (url.includes('/api/categorias')) {
        return new Response(JSON.stringify(categorias), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (url.includes('/api/cursos')) {
        return new Response(JSON.stringify(cursosMock), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (url.includes('/api/anuncios')) {
        const isDoacao = url.includes('modalidade=doacao')
        const paginaMock: Pagina<AnuncioResumo> = {
            itens: isDoacao
                ? [anuncioDoacaoMock, { ...anuncioDoacaoMock, id: 3, titulo: 'Jaleco Branco' }]
                : [anuncioVendaMock, { ...anuncioVendaMock, id: 4, titulo: 'Monitor LG', preco: 450, capaUrl: '' }],
            pagina: 1,
            tamanho: 10,
            total: 2,
            totalPaginas: 1,
        }
        return new Response(JSON.stringify(paginaMock), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({}), { status: 200 })
}

export function MockApiProvider({ children }: { children: ReactNode }) {
    useLayoutEffect(() => {
        const originalFetch = window.fetch

        window.fetch = async (input, init) => {
            const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

            if (url.includes('/api/')) {
                return mockFetch(input, init)
            }

            return originalFetch(input, init)
        }

        return () => {
            window.fetch = originalFetch
        }
    }, [])

    return <>{children}</>
}