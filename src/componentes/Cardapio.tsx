import { useEffect, useState } from 'react'
import { CATEGORIAS, PRODUTOS, type Categoria, type Produto } from '../dados/produtos'
import { brlPartes } from '../lib/moeda'
import { useCarrinho } from '../carrinho/CarrinhoContext'

const CHAVE_FAVORITOS = 'cacilda-favoritos'

export function Cardapio() {
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) ?? '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos))
    } catch {
      // Navegação privada bloqueia o storage — favoritos seguem só nesta sessão.
    }
  }, [favoritos])

  function alternarFavorito(id: string) {
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id],
    )
  }

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
          <CartaoProduto
            key={p.id}
            produto={p}
            favorito={favoritos.includes(p.id)}
            aoFavoritar={() => alternarFavorito(p.id)}
          />
        ))}
      </ul>
    </section>
  )
}

function CartaoProduto({
  produto,
  favorito,
  aoFavoritar,
}: {
  produto: Produto
  favorito: boolean
  aoFavoritar: () => void
}) {
  const { adicionar } = useCarrinho()
  const preco = brlPartes(produto.preco)
  const categoria = CATEGORIAS.find((c) => c.id === produto.categoria)

  return (
    <li className="produto">
      <div className="produto-figura">
        {produto.imagem ? (
          <img src={produto.imagem} alt={produto.nome} loading="lazy" />
        ) : (
          <span className="produto-sem-foto" aria-hidden="true">
            {produto.emoji}
          </span>
        )}

        <button
          type="button"
          className={favorito ? 'favorito favorito-ativo' : 'favorito'}
          onClick={aoFavoritar}
          aria-pressed={favorito}
          aria-label={favorito ? `Remover ${produto.nome} dos favoritos` : `Favoritar ${produto.nome}`}
        >
          {favorito ? '♥' : '♡'}
        </button>

        {produto.destaque && <span className="selo">favorito da casa</span>}
      </div>

      <div className="produto-corpo">
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-categoria">
          em <span>{categoria?.nome}</span>
        </p>
        <p className="produto-desc">{produto.descricao}</p>
      </div>

      <div className="produto-rodape">
        <span className="produto-preco">
          <span className="preco-simbolo">{preco.simbolo}</span>
          {preco.valor}
        </span>
        <button className="botao-adicionar" onClick={() => adicionar(produto)}>
          Adicionar
        </button>
      </div>
    </li>
  )
}
