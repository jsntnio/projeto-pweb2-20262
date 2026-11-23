import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
    icon?: ReactNode
}

export function Input({ hasError = false, icon, className = '', ...rest }: InputProps) {
    const wrapperClasses = [
        styles.wrapper,
        hasError ? styles.wrapperError : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={wrapperClasses}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <input className={styles.input} {...rest} />
        </div>
    )
}