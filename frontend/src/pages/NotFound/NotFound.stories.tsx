import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { NotFound } from './NotFound'

const meta = {
    title: 'Pages/NotFound',
    component: NotFound,
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}