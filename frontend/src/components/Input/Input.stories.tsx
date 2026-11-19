import type { Meta, StoryObj } from '@storybook/react-vite'
import { LuMail } from 'react-icons/lu'
import { Input } from './Input'

const meta = {
    title: 'Components/Input',
    component: Input,
    args: {
        placeholder: 'Digite seu e-mail',
        hasError: false,
        disabled: false,
    },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const ComIcone: Story = {
    args: {
        icon: <LuMail size={20} />,
        placeholder: 'seu.email@academico.ifpb.edu.br',
    },
}

export const Erro: Story = {
    args: {
        hasError: true,
        placeholder: 'E-mail inválido',
    },
}

export const Desabilitado: Story = {
    args: {
        disabled: true,
        value: 'estudante@academico.ifpb.edu.br',
    },
}