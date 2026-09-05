import { LOJA } from '../dados/loja'
import { statusLoja } from '../lib/horario'
import { useCarrinho } from '../carrinho/CarrinhoContext'

export function Cabecalho({ aoAbrirCarrinho }: { aoAbrirCarrinho: () => void }) {
  const status = statusLoja()
  const { quantidadeTotal } = useCarrinho()

  return (
    <header className="cabecalho">
      <div className="marca">
        <span className="marca-nome">{LOJA.nome}</span>
        <span className="marca-sub">{LOJA.subtitulo}</span>
      </div>

      <div className="cabecalho-acoes">
        <span className={status.aberto ? 'status status-aberto' : 'status status-fechado'}>
          <span className="status-bolinha" aria-hidden="true" />
          {status.mensagem}
        </span>

        <button className="botao-carrinho" onClick={aoAbrirCarrinho}>
          Carrinho
          {quantidadeTotal > 0 && <span className="contador">{quantidadeTotal}</span>}
        </button>
      </div>
    </header>
  )
}
