import type { Meta, StoryObj } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { Doacoes } from './Doacoes'
import { authReducer } from '../../features/auth/authSlice'
import { anunciosReducer } from '../../features/anuncios/anunciosSlice'
import { MockApiProvider } from '../../stories/MockApiProvider'

function criarStore() {
    return configureStore({
        reducer: { auth: authReducer, anuncios: anunciosReducer },
        preloadedState: {
            auth: { usuario: null, token: 'fake', carregando: false, erro: null, restaurandoSessao: false },
            anuncios: { detalhe: null, carregando: false, erro: null },
        },
    })
}

const meta = {
    title: 'Pages/Doacoes',
    component: Doacoes,
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <MockApiProvider>
                <Provider store={criarStore()}>
                    <MemoryRouter initialEntries={['/doacoes']}>
                        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', padding: 'var(--space-5)' }}>
                            <Story />
                        </div>
                    </MemoryRouter>
                </Provider>
            </MockApiProvider>
        ),
    ],
} satisfies Meta<typeof Doacoes>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}