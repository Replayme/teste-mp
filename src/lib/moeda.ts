const FORMATO = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata centavos como moeda brasileira: 1290 -> "R$ 12,90". */
export function brl(centavos: number): string {
  return FORMATO.format(centavos / 100)
}

/**
 * Separa símbolo e valor para poder estilizar cada um: 1290 -> { simbolo: 'R$', valor: '12,90' }.
 * Usado no preço dos cartões, onde o "R$" fica menor que o número.
 */
export function brlPartes(centavos: number): { simbolo: string; valor: string } {
  const partes = FORMATO.formatToParts(centavos / 100)
  return {
    simbolo: partes.filter((p) => p.type === 'currency').map((p) => p.value).join(''),
    valor: partes
      .filter((p) => p.type !== 'currency' && p.type !== 'literal')
      .map((p) => p.value)
      .join(''),
  }
}
