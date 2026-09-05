/** Formata centavos como moeda brasileira: 1290 -> "R$ 12,90". */
export function brl(centavos: number): string {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
