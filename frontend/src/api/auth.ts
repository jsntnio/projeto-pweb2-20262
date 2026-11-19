import { http } from './client'
import type { LoginPayload, SessaoResposta, CadastroPayload, UsuarioLogado } from '../types'

export const authApi = {
    login: (dados: LoginPayload) =>
        http.post<SessaoResposta>('/auth/login', dados),

    cadastro: (dados: CadastroPayload) =>
        http.post<SessaoResposta>('/auth/cadastro', dados),

    getUsuarioLogado: () =>
        http.get<UsuarioLogado>('/usuarios/eu'),
}