import type { Meta, StoryObj } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'
import { authReducer } from '../../features/auth/authSlice'
import { anunciosReducer } from '../../features/anuncios/anunciosSlice'
import { usuarioEduardo } from '../../stories/fixtures'
import type { UsuarioLogado } from '../../types'

function criarStore(usuarioLogado: UsuarioLogado | null) {
    return configureStore({
        reducer: { auth: authReducer, anuncios: anunciosReducer },
        preloadedState: {
            auth: {
                usuario: usuarioLogado,
                token: usuarioLogado ? 'fake' : null,
                carregando: false,
                erro: null,
            },
            anuncios: { detalhe: null, carregando: false, erro: null },
        },
    })
}

const meta = {
    title: 'Components/Header',
    component: Header,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Logado: Story = {
    decorators: [
        (Story) => (
            <Provider store={criarStore(usuarioEduardo)}>
                <MemoryRouter initialEntries={['/vendas']}>
                    <Story />
                </MemoryRouter>
            </Provider>
        ),
    ],
}

export const Deslogado: Story = {
    decorators: [
        (Story) => (
            <Provider store={criarStore(null)}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </Provider>
        ),
    ],
}