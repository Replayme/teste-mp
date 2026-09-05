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
 * Este texto É o pedido: é a única coisa que a cozinha vai ler.
 * Use `brl(centavos)` para os valores e `\n` para quebrar linha.
 */
export function montarMensagem(pedido: Pedido): string {
  // TODO(human)
  return `Pedido de ${pedido.nome} — total ${brl(pedido.total)}`
}

/** Abre o WhatsApp da loja com o pedido já escrito. */
export function linkPedido(pedido: Pedido): string {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(montarMensagem(pedido))}`
}
