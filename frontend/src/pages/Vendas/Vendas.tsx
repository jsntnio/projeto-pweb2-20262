import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAnuncios } from '../../hooks/useAnuncios'
import { CardAnuncio } from '../../components/CardAnuncio/CardAnuncio'
import { Paginacao } from '../../components/Paginacao/Paginacao'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Loading } from '../../components/Loading'
import { http } from '../../api/client'
import type { Categoria } from '../../types'
import styles from './Vendas.module.css'

export function Vendas() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { dados, carregando, erro } = useAnuncios('venda')

    const [categorias, setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        http.get<Categoria[]>('/categorias')
            .then(setCategorias)
            .catch((err) => console.error('Erro ao buscar categorias', err))
    }, [])

    function atualizarFiltros(novosFiltros: Record<string, string | undefined>) {
        const newParams = new URLSearchParams(searchParams)

        Object.entries(novosFiltros).forEach(([chave, valor]) => {
            if (valor) {
                newParams.set(chave, valor)
            } else {
                newParams.delete(chave)
            }
        })

        newParams.set('pagina', '1')
        setSearchParams(newParams)
    }

    const ordemAtual = searchParams.get('ordem') || 'data'
    const direcaoAtual = searchParams.get('direcao') || 'desc'
    const valorOrdenacao = `${ordemAtual}-${direcaoAtual}`

    function handleOrdenacao(e: React.ChangeEvent<HTMLSelectElement>) {
        const [novaOrdem, novaDirecao] = e.target.value.split('-')
        atualizarFiltros({ ordem: novaOrdem, direcao: novaDirecao })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Explorar Vendas</h1>
                <p className={styles.subtitle}>Encontre materiais e eletrônicos com outros estudantes.</p>
            </div>

            <div className={styles.filters}>

                <div className={styles.filterGroup}>
                    <label>Categoria</label>
                    <Select
                        value={searchParams.get('categoria') || ''}
                        onChange={(e) => atualizarFiltros({ categoria: e.target.value })}
                    >
                        <option value="">Todas as categorias</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.nome}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Ordenar por</label>
                    <Select
                        value={valorOrdenacao}
                        onChange={handleOrdenacao}
                    >
                        <option value="data-desc">Mais recentes</option>
                        <option value="data-asc">Mais antigas</option>
                        <option value="preco-asc">Menor preço</option>
                        <option value="preco-desc">Maior preço</option>
                    </Select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Preço Mínimo.</label>
                    <Input
                        type="number"
                        placeholder="Digito o preço mínimo"
                        value={searchParams.get('precoMin') || ''}
                        onChange={(e) => atualizarFiltros({ precoMin: e.target.value })}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Preço Máximo.</label>
                    <Input
                        type="number"
                        placeholder="Digito o preço máximo"
                        value={searchParams.get('precoMax') || ''}
                        onChange={(e) => atualizarFiltros({ precoMax: e.target.value })}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>Itens por página</label>
                    <Select
                        value={searchParams.get('tamanho') || '10'}
                        onChange={(e) => atualizarFiltros({ tamanho: e.target.value })}
                    >
                        <option value="5">5 itens</option>
                        <option value="10">10 itens</option>
                        <option value="25">25 itens</option>
                        <option value="50">50 itens</option>
                    </Select>
                </div>
            </div>

            {carregando ? (
                <div className={styles.status}>
                    <Loading size="lg" />
                </div>
            ) : erro ? (
                <div className={styles.statusErro}>{erro}</div>
            ) : dados?.itens.length === 0 ? (
                <div className={styles.status}>Nenhum anúncio encontrado com esses filtros.</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {dados?.itens.map((anuncio) => (
                            <CardAnuncio key={anuncio.id} anuncio={anuncio} />
                        ))}
                    </div>

                    <Paginacao
                        paginaAtual={dados!.pagina}
                        totalPaginas={dados!.totalPaginas}
                    />
                </>
            )}
        </div>
    )
}