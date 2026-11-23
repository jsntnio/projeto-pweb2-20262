import type { SelectHTMLAttributes } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    hasError?: boolean
}

export function Select({ hasError = false, className = '', children, ...rest }: SelectProps) {
    const wrapperClasses = [
        styles.wrapper,
        hasError ? styles.wrapperError : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={wrapperClasses}>
            <select className={styles.select} {...rest}>
                {children}
            </select>
            <div className={styles.icon}>
                <LuChevronDown size={20} />
            </div>
        </div>
    )
}