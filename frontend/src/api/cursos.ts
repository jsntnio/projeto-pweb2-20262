import { http } from './client'
import type { Curso } from '../types'

export const cursosApi = {
    listar: () => http.get<Curso[]>('/cursos'),
}