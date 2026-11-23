import type { Meta, StoryObj } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Cadastro } from './Cadastro'
import { authReducer } from '../../features/auth/authSlice'
import { anunciosReducer } from '../../features/anuncios/anunciosSlice'
import { MockApiProvider } from '../../stories/MockApiProvider'

function criarStoreAuth(carregando = false, erro: string | null = null) {
    return configureStore({
        reducer: { auth: authReducer, anuncios: anunciosReducer },
        preloadedState: {
            auth: { usuario: null, token: null, carregando, erro, restaurandoSessao: false },
            anuncios: { detalhe: null, carregando: false, erro: null },
        },
    })
}

const meta = {
    title: 'Pages/Cadastro',
    component: Cadastro,
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <MockApiProvider>
                <Provider store={criarStoreAuth()}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </Provider>
            </MockApiProvider>
        ),
    ],
} satisfies Meta<typeof Cadastro>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const ComErroNaApi: Story = {
    decorators: [
        (Story) => (
            <MockApiProvider>
                <Provider store={criarStoreAuth(false, 'Este e-mail já está cadastrado.')}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </Provider>
            </MockApiProvider>
        ),
    ],
}

export const Carregando: Story = {
    decorators: [
        (Story) => (
            <MockApiProvider>
                <Provider store={criarStoreAuth(true)}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </Provider>
            </MockApiProvider>
        ),
    ],
}