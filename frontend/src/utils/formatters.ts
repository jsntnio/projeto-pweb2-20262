export function formatarPreco(preco: number | null): string {
    if (preco === null) return 'Doação'
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(preco)
}