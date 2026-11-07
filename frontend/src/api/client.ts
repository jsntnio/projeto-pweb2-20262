import type { RespostaErroApi } from '../types'

const BASE_URL = '/api'

export const STORAGE_KEYS = {
    token: 'marketplace.token',
    usuario: 'marketplace.usuario',
} as const


export function getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.token)
}

export function setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.token, token)
}

export function clearToken(): void {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.usuario)
}

export class ApiError extends Error {
    readonly status: number
    readonly campos?: Record<string, string>

    constructor(status: number, mensagem: string, campos?: Record<string, string>) {
        super(mensagem)
        this.name = 'ApiError'
        this.status = status
        this.campos = campos
    }

    get naoAutorizado(): boolean {
        return this.status === 401
    }
}

type RequestOptions = {
    json?: unknown
    body?: BodyInit
    headers?: Record<string, string>
}

async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {},
): Promise<T> {
    const headers: Record<string, string> = { ...options.headers }

    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`

    let body: BodyInit | undefined
    if (options.json !== undefined) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(options.json)
    } else if (options.body !== undefined) {
        body = options.body
    }

    const res = await fetch(`${BASE_URL}${path}`, { method, headers, body })

    if (res.status === 204) return undefined as T

    if (res.ok) {
        const contentType = res.headers.get('Content-Type') ?? ''
        if (contentType.includes('application/json')) {
            return (await res.json()) as T
        }
        return undefined as T
    }

    let mensagem = `Erro ${res.status}`
    let campos: Record<string, string> | undefined
    try {
        const erro = (await res.json()) as Partial<RespostaErroApi>
        if (erro.mensagem) mensagem = erro.mensagem
        if (erro.campos) campos = erro.campos
    } catch {
    }
    throw new ApiError(res.status, mensagem, campos)
}

export function buildQuery(
    params: Record<string, string | number | boolean | undefined | null>,
): string {
    const search = new URLSearchParams()
    for (const [chave, valor] of Object.entries(params)) {
        if (valor === undefined || valor === null || valor === '') continue
        search.set(chave, String(valor))
    }
    const qs = search.toString()
    return qs ? `?${qs}` : ''
}

export const http = {
    get<T>(path: string): Promise<T> {
        return request<T>('GET', path)
    },

    post<T>(path: string, json: unknown): Promise<T> {
        return request<T>('POST', path, { json })
    },

    put<T>(path: string, json: unknown): Promise<T> {
        return request<T>('PUT', path, { json })
    },

    patch<T>(path: string, json: unknown): Promise<T> {
        return request<T>('PATCH', path, { json })
    },

    delete<T = void>(path: string): Promise<T> {
        return request<T>('DELETE', path)
    },

    postMultipart<T>(path: string, formData: FormData): Promise<T> {
        return request<T>('POST', path, { body: formData })
    },

    putMultipart<T>(path: string, formData: FormData): Promise<T> {
        return request<T>('PUT', path, { body: formData })
    },
}