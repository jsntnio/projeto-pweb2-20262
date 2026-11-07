export type Papel = 'estudante' | 'administrador'

export type Modalidade = 'venda' | 'doacao'

export type EstadoAnuncio =
    | 'ativo'
    | 'pausado'
    | 'reservado'
    | 'vendido'
    | 'concluido'

export type EstadoConservacao = 'novo' | 'seminovo' | 'usado'

export interface Curso {
    id: number
    nome: string
}

export interface Categoria {
    id: number
    nome: string
    slug: string
}

export interface UsuarioLogado {
    id: number
    nome: string
    email: string
    curso: Curso
    telefone: string | null
    fotoUrl: string | null
    papel: Papel
}

export interface Perfil {
    id: number
    nome: string
    curso: Curso
    telefone: string | null
    fotoUrl: string | null
}

export interface AnuncianteResumo {
    id: number
    nome: string
}

export interface FotoAnuncio {
    id: number
    url: string
    capa: boolean
}

export interface Anuncio {
    id: number
    titulo: string
    descricao: string
    modalidade: Modalidade
    preco: number | null
    estado: EstadoAnuncio
    estadoConservacao: EstadoConservacao
    categoria: Categoria
    localEntrega: string
    capaUrl: string
    fotos: FotoAnuncio[]
    anunciante: Perfil
    publicadoEm: string
    atualizadoEm: string
}

export interface AnuncioResumo {
    id: number
    titulo: string
    modalidade: Modalidade
    preco: number | null
    estado: EstadoAnuncio
    estadoConservacao: EstadoConservacao
    categoria: Categoria
    capaUrl: string
    anunciante: AnuncianteResumo
    publicadoEm: string
}

export interface Pagina<T> {
    itens: T[]
    pagina: number
    tamanho: number
    total: number
    totalPaginas: number
}

export interface LoginPayload {
    email: string
    senha: string
}

export interface CadastroPayload {
    nome: string
    email: string
    senha: string
    cursoId: number
    telefone?: string
}

export interface SessaoResposta {
    token: string
    expiraEm: string
    usuario: UsuarioLogado
}

export interface AtualizarPerfilPayload {
    nome: string
    cursoId: number
    telefone?: string
}

export interface NovoAnuncioPayload {
    titulo: string
    descricao: string
    modalidade: Modalidade
    preco: number | null
    estadoConservacao: EstadoConservacao
    categoriaId: number
    localEntrega: string
    fotos: File[]
    capaIndice: number
}

export interface EdicaoAnuncioPayload {
    titulo: string
    descricao: string
    modalidade: Modalidade
    preco: number | null
    estadoConservacao: EstadoConservacao
    categoriaId: number
    localEntrega: string
    fotosMantidas: number[]
    fotos: File[]
    capaId?: number
    capaIndice?: number
}

export interface AlterarEstadoPayload {
    estado: EstadoAnuncio
}

export interface OpcaoEstadoConservacao {
    valor: EstadoConservacao
    rotulo: string
}

export type TamanhoPagina = 5 | 10 | 25 | 50
export type OrdemBusca = 'data' | 'preco'
export type DirecaoBusca = 'asc' | 'desc'

export interface BuscaParams {
    modalidade: Modalidade
    categoria?: string
    precoMin?: number
    precoMax?: number
    ordem?: OrdemBusca
    direcao?: DirecaoBusca
    pagina?: number
    tamanho?: TamanhoPagina
}

export interface RespostaErroApi {
    mensagem: string
    campos?: Record<string, string>
}