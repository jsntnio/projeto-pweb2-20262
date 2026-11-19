import type { ReactNode } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
    label: string
    htmlFor: string
    error?: string | null
    children: ReactNode
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={htmlFor} className={styles.label}>
                {label}
            </label>
            {children}
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}