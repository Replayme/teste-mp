import { useState } from 'react'
import { CATEGORIAS, PRODUTOS, type Categoria } from '../dados/produtos'
import { brl } from '../lib/moeda'
import { useCarrinho } from '../carrinho/CarrinhoContext'

export function Cardapio() {
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')
  const { adicionar } = useCarrinho()

  const visiveis = PRODUTOS.filter(
    (p) => !p.indisponivel && (filtro === 'todos' || p.categoria === filtro),
  )

  return (
    <section className="cardapio" id="cardapio">
      <h2 className="secao-titulo">Cardápio</h2>

      <div className="filtros" role="tablist" aria-label="Categorias">
        <button
          role="tab"
          aria-selected={filtro === 'todos'}
          className={filtro === 'todos' ? 'chip chip-ativo' : 'chip'}
          onClick={() => setFiltro('todos')}
        >
          Todos
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={filtro === c.id}
            className={filtro === c.id ? 'chip chip-ativo' : 'chip'}
            onClick={() => setFiltro(c.id)}
          >
            {c.nome}
          </button>
        ))}
      </div>

      <ul className="grade">
        {visiveis.map((p) => (
          <li key={p.id} className="produto">
            <div className="produto-imagem" aria-hidden="true">
              {p.emoji}
            </div>
            <div className="produto-corpo">
              <h3 className="produto-nome">
                {p.nome}
                {p.destaque && <span className="tag">favorito</span>}
              </h3>
              <p className="produto-desc">{p.descricao}</p>
              <div className="produto-rodape">
                <span className="produto-preco">{brl(p.preco)}</span>
                <button className="botao botao-primario botao-pequeno" onClick={() => adicionar(p)}>
                  Adicionar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
