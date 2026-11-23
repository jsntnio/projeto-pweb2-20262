import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuImage } from 'react-icons/lu'
import type { AnuncioResumo } from '../../types'
import { formatarPreco } from '../../utils/formatters'
import styles from './CardAnuncio.module.css'

interface CardAnuncioProps {
    anuncio: AnuncioResumo
}

export function CardAnuncio({ anuncio }: CardAnuncioProps) {
    const isDoacao = anuncio.modalidade === 'doacao'
    const [imgError, setImgError] = useState(false)

    return (
        <Link to={`/anuncios/${anuncio.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {!imgError && anuncio.capaUrl ? (
                    <img
                        src={anuncio.capaUrl}
                        alt={anuncio.titulo}
                        className={styles.image}
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <LuImage size={36} />
                        <span>Sem foto</span>
                    </div>
                )}
                <span className={styles.badge}>{anuncio.categoria.nome}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{anuncio.titulo}</h3>

                <span className={`${styles.price} ${isDoacao ? styles.priceDoacao : ''}`}>
                    {formatarPreco(anuncio.preco)}
                </span>

                <div className={styles.footer}>
                    <div className={styles.user}>
                        <span className={styles.userAvatar}>
                            {anuncio.anunciante.nome.charAt(0).toUpperCase()}
                        </span>
                        <span className={styles.userName}>{anuncio.anunciante.nome}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}