import type { Categoria, Curso, UsuarioLogado, AnuncioResumo } from '../types'

export const cursoAds: Curso = {
    id: 1,
    nome: 'Análise e Desenvolvimento de Sistemas',
}

export const usuarioEduardo: UsuarioLogado = {
    id: 1,
    nome: 'Eduardo Lima',
    email: 'eduardo@academico.ifpb.edu.br',
    curso: cursoAds,
    telefone: null,
    fotoUrl: null,
    papel: 'estudante',
}

export const categoriaEletronicos: Categoria = {
    id: 1,
    nome: 'Eletrônicos e informática',
    slug: 'eletronicos',
}

export const categorias: Categoria[] = [
    categoriaEletronicos,
    { id: 2, nome: 'Livros e material didático', slug: 'materiais-didatico' },
    { id: 3, nome: 'Materiais de laboratório', slug: 'materiais-de-laboratorio' },
    { id: 4, nome: 'Roupas e uniformes', slug: 'roupas' },
    { id: 5, nome: 'Móveis', slug: 'moveis' },
    { id: 6, nome: 'Utensílios domésticos', slug: 'utensilios' },
    { id: 7, nome: 'Artesanato e itens criativos', slug: 'artesanato' },
]

export const anuncioVendaMock: AnuncioResumo = {
    id: 1,
    titulo: 'Notebook Dell Inspiron 15',
    modalidade: 'venda',
    preco: 1800,
    estado: 'ativo',
    estadoConservacao: 'seminovo',
    categoria: categoriaEletronicos,
    capaUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop',
    anunciante: {
        id: usuarioEduardo.id,
        nome: usuarioEduardo.nome,
    },
    publicadoEm: new Date().toISOString(),
}

export const anuncioDoacaoMock: AnuncioResumo = {
    id: 2,
    titulo: 'Livro Cálculo Volume 1 - Stewart',
    modalidade: 'doacao',
    preco: null,
    estado: 'ativo',
    estadoConservacao: 'usado',
    categoria: categorias[1],
    capaUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=300&fit=crop',
    anunciante: {
        id: 2,
        nome: 'Maria Clara',
    },
    publicadoEm: new Date().toISOString(),
}