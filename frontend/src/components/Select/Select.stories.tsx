import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta = {
    title: 'Components/Select',
    component: Select,
    args: {
        hasError: false,
        disabled: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
    args: {
        children: (
            <>
                <option value="" disabled selected>Selecione uma opção</option>
                <option value="1">Análise e Desenvolvimento de Sistemas</option>
                <option value="2">Engenharia Civil</option>
                <option value="3">Licenciatura em Matemática</option>
            </>
        ),
    },
}

export const ComValorSelecionado: Story = {
    args: {
        defaultValue: '1',
        children: (
            <>
                <option value="1">Análise e Desenvolvimento de Sistemas</option>
                <option value="2">Engenharia Civil</option>
            </>
        ),
    },
}

export const TextoLongo: Story = {
    args: {
        defaultValue: '4',
        children: (
            <>
                <option value="4">Técnico Subsequente em Eletromecânica (Nome muito longo para testar o limite)</option>
            </>
        ),
    },
}

export const Erro: Story = {
    args: {
        hasError: true,
        children: (
            <>
                <option value="" disabled selected>Selecione uma opção</option>
            </>
        ),
    },
}

export const Desabilitado: Story = {
    args: {
        disabled: true,
        defaultValue: '2',
        children: (
            <>
                <option value="2">Engenharia de Controle e Automação</option>
            </>
        ),
    },
}