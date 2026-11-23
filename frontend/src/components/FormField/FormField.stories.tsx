import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../Input/Input'
import { FormField } from './FormField'

const meta = {
    title: 'Components/FormField',
    component: FormField,
    args: {
        label: 'E-mail',
        htmlFor: 'email',
        error: null,
        children: <Input id="email" placeholder="Digite seu e-mail" />,
    },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const ComErro: Story = {
    args: {
        error: 'O e-mail deve terminar com @academico.ifpb.edu.br',
        children: <Input id="email" hasError placeholder="Digite seu e-mail" />,
    },
}