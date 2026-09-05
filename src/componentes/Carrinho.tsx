import { useEffect, useState } from 'react'
import { useCarrinho } from '../carrinho/CarrinhoContext'
import { brl } from '../lib/moeda'
import { linkPedido } from '../lib/whatsapp'
import { statusLoja } from '../lib/horario'
import { LOJA } from '../dados/loja'

export function Carrinho({ aberto, aoFechar }: { aberto: boolean; aoFechar: () => void }) {
  const c = useCarrinho()
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const status = statusLoja()

  // Trava o scroll da página enquanto a gaveta está aberta. Sem isso, no
  // celular o dedo "vaza" do carrinho e rola o cardápio por baixo.
  useEffect(() => {
    if (!aberto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = anterior
    }
  }, [aberto])

  if (!aberto) return null

  const faltaEndereco = c.modo === 'entrega' && endereco.trim().length < 8
  const podeEnviar =
    c.itens.length > 0 && nome.trim().length >= 2 && !faltaEndereco && !c.abaixoDoMinimo

  function enviar() {
    const url = linkPedido({
      itens: c.itens,
      modo: c.modo,
      nome: nome.trim(),
      endereco: endereco.trim(),
      observacoes: observacoes.trim(),
      subtotal: c.subtotal,
      taxa: c.taxa,
      total: c.total,
    })
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div className="fundo-modal" onClick={aoFechar}>
      <aside className="gaveta" onClick={(e) => e.stopPropagation()} aria-label="Seu pedido">
        <div className="gaveta-topo">
          <h2>Seu pedido</h2>
          <button className="fechar" onClick={aoFechar} aria-label="Fechar">
            ×
          </button>
        </div>

        {!status.aberto && (
          <p className="aviso">
            A loja está fechada agora ({LOJA.horario.texto}). Você pode montar o pedido e enviar
            quando abrirmos.
          </p>
        )}

        {c.itens.length === 0 ? (
          <p className="vazio">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="itens">
              {c.itens.map((i) => (
                <li key={i.produto.id} className="item">
                  <span className="item-emoji" aria-hidden="true">{i.produto.emoji}</span>
                  <div className="item-info">
                    <strong>{i.produto.nome}</strong>
                    <span className="item-preco">{brl(i.produto.preco * i.quantidade)}</span>
                  </div>
                  <div className="qtd">
                    <button onClick={() => c.alterar(i.produto.id, -1)} aria-label="Diminuir">−</button>
                    <span>{i.quantidade}</span>
                    <button onClick={() => c.alterar(i.produto.id, 1)} aria-label="Aumentar">+</button>
                  </div>
                </li>
              ))}
            </ul>

            <fieldset className="modo">
              <legend>Como quer receber?</legend>
              <label className={c.modo === 'retirada' ? 'opcao opcao-ativa' : 'opcao'}>
                <input
                  type="radio"
                  name="modo"
                  checked={c.modo === 'retirada'}
                  onChange={() => c.setModo('retirada')}
                />
                Retirar no local
              </label>
              <label className={c.modo === 'entrega' ? 'opcao opcao-ativa' : 'opcao'}>
                <input
                  type="radio"
                  name="modo"
                  checked={c.modo === 'entrega'}
                  onChange={() => c.setModo('entrega')}
                />
                Entrega (+{brl(LOJA.taxaEntrega)})
              </label>
            </fieldset>

            <label className="campo">
              Seu nome
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como te chamamos?" />
            </label>

            {c.modo === 'entrega' && (
              <label className="campo">
                Endereço de entrega
                <input
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, número, bairro e ponto de referência"
                />
              </label>
            )}

            <label className="campo">
              Observações
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Sem cebola, ponto da carne, troco para..."
                rows={2}
              />
            </label>

            <div className="totais">
              <div>
                <span>Subtotal</span>
                <span>{brl(c.subtotal)}</span>
              </div>
              {c.taxa > 0 && (
                <div>
                  <span>Entrega</span>
                  <span>{brl(c.taxa)}</span>
                </div>
              )}
              <div className="total">
                <span>Total</span>
                <span>{brl(c.total)}</span>
              </div>
            </div>

            {c.abaixoDoMinimo && (
              <p className="aviso">
                Pedido mínimo para entrega é {brl(LOJA.minimoEntrega)}. Faltam{' '}
                {brl(LOJA.minimoEntrega - c.subtotal)}.
              </p>
            )}

            <button className="botao botao-primario botao-largo" disabled={!podeEnviar} onClick={enviar}>
              Enviar pedido pelo WhatsApp
            </button>
            <button className="botao-texto" onClick={c.limpar}>
              Esvaziar carrinho
            </button>
          </>
        )}
      </aside>
    </div>
  )
}
