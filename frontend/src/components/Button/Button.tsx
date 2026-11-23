import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loading } from '../Loading'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'outline' | 'danger'
    isLoading?: boolean
    fullWidth?: boolean
}

export function Button({
    children,
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...rest
}: ButtonProps) {
    const classNames = [
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            className={classNames}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <>
                    <Loading size="sm" color="white" />
                </>
            ) : (
                children
            )}
        </button>
    )
}