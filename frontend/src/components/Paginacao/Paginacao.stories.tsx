import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Paginacao } from './Paginacao'

const meta = {
    title: 'Components/Paginacao',
    component: Paginacao,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof Paginacao>

export default meta
type Story = StoryObj<typeof meta>

export const PaginaIntermediaria: Story = {
    args: {
        paginaAtual: 2,
        totalPaginas: 10,
    },
}

export const PrimeiraPagina: Story = {
    args: {
        paginaAtual: 1,
        totalPaginas: 10,
    },
}

export const UltimaPagina: Story = {
    args: {
        paginaAtual: 10,
        totalPaginas: 10,
    },
}

export const PaginaUnica: Story = {
    args: {
        paginaAtual: 1,
        totalPaginas: 1,
    },
}