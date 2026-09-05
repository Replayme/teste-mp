import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Produto } from '../dados/produtos'
import { LOJA } from '../dados/loja'

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

export type ModoEntrega = 'retirada' | 'entrega'

interface CarrinhoValor {
  itens: ItemCarrinho[]
  modo: ModoEntrega
  setModo: (m: ModoEntrega) => void
  adicionar: (p: Produto) => void
  alterar: (id: string, delta: number) => void
  remover: (id: string) => void
  limpar: () => void
  quantidadeTotal: number
  subtotal: number
  taxa: number
  total: number
  abaixoDoMinimo: boolean
}

const Ctx = createContext<CarrinhoValor | null>(null)
const CHAVE = 'cacilda-carrinho'

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) ?? '[]') as ItemCarrinho[]
    } catch {
      return []
    }
  })
  const [modo, setModo] = useState<ModoEntrega>('retirada')

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens))
    } catch {
      // Navegação privada pode bloquear o storage — o carrinho segue em memória.
    }
  }, [itens])

  const valor = useMemo<CarrinhoValor>(() => {
    const subtotal = itens.reduce((s, i) => s + i.produto.preco * i.quantidade, 0)
    const taxa = modo === 'entrega' && subtotal > 0 ? LOJA.taxaEntrega : 0

    return {
      itens,
      modo,
      setModo,
      adicionar: (p) =>
        setItens((atual) => {
          const existe = atual.find((i) => i.produto.id === p.id)
          if (existe) {
            return atual.map((i) =>
              i.produto.id === p.id ? { ...i, quantidade: i.quantidade + 1 } : i,
            )
          }
          return [...atual, { produto: p, quantidade: 1 }]
        }),
      alterar: (id, delta) =>
        setItens((atual) =>
          atual
            .map((i) =>
              i.produto.id === id ? { ...i, quantidade: i.quantidade + delta } : i,
            )
            .filter((i) => i.quantidade > 0),
        ),
      remover: (id) => setItens((atual) => atual.filter((i) => i.produto.id !== id)),
      limpar: () => setItens([]),
      quantidadeTotal: itens.reduce((s, i) => s + i.quantidade, 0),
      subtotal,
      taxa,
      total: subtotal + taxa,
      abaixoDoMinimo: modo === 'entrega' && subtotal > 0 && subtotal < LOJA.minimoEntrega,
    }
  }, [itens, modo])

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useCarrinho(): CarrinhoValor {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCarrinho precisa estar dentro de <CarrinhoProvider>')
  return ctx
}
