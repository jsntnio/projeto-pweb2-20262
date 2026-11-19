import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
    title: 'Components/Button',
    component: Button,
    args: {
        children: 'Entrar',
        variant: 'primary',
        isLoading: false,
        fullWidth: false,
        disabled: false,
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'outline', 'danger'],
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Outline: Story = {
    args: { variant: 'outline' },
}

export const Carregando: Story = {
    args: { isLoading: true },
}

export const LarguraTotal: Story = {
    args: { fullWidth: true },
}