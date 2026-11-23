import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { CardAnuncio } from './CardAnuncio'
import { anuncioVendaMock, anuncioDoacaoMock } from '../../stories/fixtures'

const meta = {
    title: 'Components/CardAnuncio',
    component: CardAnuncio,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: '300px' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof CardAnuncio>

export default meta
type Story = StoryObj<typeof meta>

export const Venda: Story = {
    args: {
        anuncio: anuncioVendaMock,
    },
}

export const Doacao: Story = {
    args: {
        anuncio: anuncioDoacaoMock,
    },
}

export const SemFoto: Story = {
    args: {
        anuncio: {
            ...anuncioVendaMock,
            capaUrl: '',
        },
    },
}