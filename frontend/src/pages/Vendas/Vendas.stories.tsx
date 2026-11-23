import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Vendas } from './Vendas'
import { authReducer } from '../../features/auth/authSlice'
import { anunciosReducer } from '../../features/anuncios/anunciosSlice'
import { anuncioVendaMock, anuncioDoacaoMock, categorias } from '../../stories/fixtures'
import type { Pagina, AnuncioResumo } from '../../types'

function criarStore() {
    return configureStore({
        reducer: { auth: authReducer, anuncios: anunciosReducer },
        preloadedState: {
            auth: {
                usuario: null,
                token: 'fake-token-para-permitir-render',
                carregando: false,
                erro: null,
                restaurandoSessao: false,
            },
            anuncios: { detalhe: null, carregando: false, erro: null },
        },
    })
}

const mockFetch = async (input: RequestInfo | URL) => {
    const url = input.toString()

    if (url.includes('/categorias')) {
        return new Response(JSON.stringify(categorias), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    if (url.includes('/anuncios')) {
        const paginaMock: Pagina<AnuncioResumo> = {
            itens: [
                anuncioVendaMock,
                { ...anuncioVendaMock, id: 3, titulo: 'Teclado Mecânico', preco: 150 },
                { ...anuncioVendaMock, id: 4, titulo: 'Monitor LG', preco: 450, capaUrl: '' },
                anuncioDoacaoMock,
                { ...anuncioDoacaoMock, id: 5, titulo: 'Jaleco Branco', modalidade: 'venda', preco: 60 },
                { ...anuncioVendaMock, id: 6, titulo: 'Cadeira de Escritório', preco: 250, categoria: categorias[4] },
            ],
            pagina: 1,
            tamanho: 10,
            total: 6,
            totalPaginas: 1,
        }
        return new Response(JSON.stringify(paginaMock), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    return new Response(JSON.stringify({}), { status: 200 })
}

function StoryWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const originalFetch = window.fetch
        window.fetch = mockFetch
        return () => {
            window.fetch = originalFetch
        }
    }, [])

    return <>{children}</>
}

const meta = {
    title: 'Pages/Vendas',
    component: Vendas,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <StoryWrapper>
                <Provider store={criarStore()}>
                    <MemoryRouter initialEntries={['/vendas']}>
                        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: 'var(--space-5)' }}>
                            <Story />
                        </div>
                    </MemoryRouter>
                </Provider>
            </StoryWrapper>
        ),
    ],
} satisfies Meta<typeof Vendas>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}