import { LOJA } from '../dados/loja'

export interface StatusLoja {
  aberto: boolean
  mensagem: string
}

/**
 * Descobre se a loja está aberta agora.
 *
 * Usa o relógio LOCAL do visitante. Para uma loja física atendendo a própria
 * cidade isso é o comportamento certo; se um dia houver clientes em outro
 * fuso, seria preciso fixar o fuso da loja (America/Sao_Paulo).
 */
export function statusLoja(agora: Date = new Date()): StatusLoja {
  const { diasAbertos, abreMin, fechaMin, texto } = LOJA.horario
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes()
  const diaAberto = (diasAbertos as readonly number[]).includes(agora.getDay())

  if (diaAberto && minutosAgora >= abreMin && minutosAgora < fechaMin) {
    return { aberto: true, mensagem: `Aberto agora · até ${formatar(fechaMin)}` }
  }
  if (diaAberto && minutosAgora < abreMin) {
    return { aberto: false, mensagem: `Fechado · abre hoje às ${formatar(abreMin)}` }
  }
  return { aberto: false, mensagem: `Fechado · ${texto}` }
}

function formatar(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}
