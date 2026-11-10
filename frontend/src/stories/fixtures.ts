import type { Categoria, Curso, UsuarioLogado } from '../types'

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
    { id: 3, nome: 'Materiais de laboratório e ferramentas', slug: 'materiais-de-laboratorio' },
    { id: 4, nome: 'Roupas e uniformes', slug: 'roupas' },
    { id: 5, nome: 'Móveis', slug: 'moveis' },
    { id: 6, nome: 'Utensílios domésticos', slug: 'utensilios' },
    { id: 7, nome: 'Artesanato e itens criativos', slug: 'artesanato' },
]