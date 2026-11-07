import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <h1>Página não encontrada</h1>
            <p
                style={{
                    color: 'var(--color-dark-soft)',
                    marginTop: 'var(--space-3)',
                }}
            >
                O endereço que você tentou acessar não existe.
            </p>
            <Link
                to="/vendas"
                style={{
                    display: 'inline-block',
                    marginTop: 'var(--space-5)',
                    padding: 'var(--space-3) var(--space-5)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-weight-medium)',
                }}
            >
                Voltar para vendas
            </Link>
        </div>
    )
}