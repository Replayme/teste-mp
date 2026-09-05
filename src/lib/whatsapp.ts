import { LOJA } from '../dados/loja'
import type { ItemCarrinho, ModoEntrega } from '../carrinho/CarrinhoContext'
import { brl } from './moeda'

export interface Pedido {
  itens: ItemCarrinho[]
  modo: ModoEntrega
  nome: string
  endereco: string
  observacoes: string
  /** Todos em centavos. */
  subtotal: number
  taxa: number
  total: number
}

/**
 * Monta o texto do pedido que chega no WhatsApp da loja.
 *
 * Este texto É o pedido: é a única coisa que a cozinha vai ler, no meio do
 * movimento. Por isso o modo de entrega vem logo no topo, e não no rodapé:
 * é o que decide se o item é embalado para viagem ou servido no salão.
 */
export function montarMensagem(pedido: Pedido): string {
  const linhas: string[] = [`*Novo pedido — ${LOJA.nome}*`, '']

  if (pedido.modo === 'entrega') {
    linhas.push('*ENTREGA*', `Endereço: ${pedido.endereco}`)
  } else {
    linhas.push('*RETIRADA NO LOCAL*')
  }

  linhas.push(`Cliente: ${pedido.nome}`, '', '*Itens*')

  for (const { produto, quantidade } of pedido.itens) {
    linhas.push(`• ${quantidade}x ${produto.nome} — ${brl(produto.preco * quantidade)}`)
  }

  linhas.push('', `Subtotal: ${brl(pedido.subtotal)}`)
  if (pedido.taxa > 0) {
    linhas.push(`Entrega: ${brl(pedido.taxa)}`)
  }
  linhas.push(`*Total: ${brl(pedido.total)}*`)

  if (pedido.observacoes) {
    linhas.push('', `*Observações:* ${pedido.observacoes}`)
  }

  return linhas.join('\n')
}

/** Abre o WhatsApp da loja com o pedido já escrito. */
export function linkPedido(pedido: Pedido): string {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(montarMensagem(pedido))}`
}
