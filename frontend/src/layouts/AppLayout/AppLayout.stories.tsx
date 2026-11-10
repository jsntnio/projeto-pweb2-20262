import type { Meta, StoryObj } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { authReducer } from '../../features/auth/authSlice'
import { anunciosReducer } from '../../features/anuncios/anunciosSlice'
import { usuarioEduardo } from '../../stories/fixtures'

const meta = {
    title: 'Layouts/AppLayout',
    component: AppLayout,
    decorators: [
        (Story) => {
            const store = configureStore({
                reducer: { auth: authReducer, anuncios: anunciosReducer },
                preloadedState: {
                    auth: { usuario: usuarioEduardo, token: 'fake', carregando: false, erro: null },
                    anuncios: { detalhe: null, carregando: false, erro: null },
                },
            })

            return (
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <Routes>
                            <Route path="/" element={<Story />}>
                                <Route
                                    index
                                    element={
                                        <div style={{ padding: 'var(--space-6)' }}>
                                            Conteúdo da página
                                        </div>
                                    }
                                />
                            </Route>
                        </Routes>
                    </MemoryRouter>
                </Provider>
            )
        },
    ],
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}