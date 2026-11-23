import { useSearchParams } from 'react-router-dom'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import styles from './Paginacao.module.css'

interface PaginacaoProps {
    paginaAtual: number
    totalPaginas: number
}

export function Paginacao({ paginaAtual, totalPaginas }: PaginacaoProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    if (totalPaginas <= 1) return null

    function mudarPagina(novaPagina: number) {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('pagina', String(novaPagina))
        setSearchParams(newParams)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                disabled={paginaAtual === 1}
                onClick={() => mudarPagina(paginaAtual - 1)}
            >
                <LuChevronLeft size={20} />
            </button>

            <span className={styles.info}>
                Página <strong>{paginaAtual}</strong> de <strong>{totalPaginas}</strong>
            </span>

            <button
                className={styles.button}
                disabled={paginaAtual === totalPaginas}
                onClick={() => mudarPagina(paginaAtual + 1)}
            >
                <LuChevronRight size={20} />
            </button>
        </div>
    )
}