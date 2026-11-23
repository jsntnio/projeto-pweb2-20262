import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loading } from './Loading'

const meta = {
    title: 'Components/Loading',
    component: Loading,
    args: {
        size: 'md',
        color: 'primary',
        fullPage: false,
    },
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        color: { control: 'select', options: ['primary', 'white'] },
    },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const TelaCheia: Story = {
    args: { fullPage: true },
}

export const FundoEscuro: Story = {
    args: { color: 'white' },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: 'var(--color-primary)', padding: '2rem', borderRadius: '8px' }}>
                <Story />
            </div>
        ),
    ],
}