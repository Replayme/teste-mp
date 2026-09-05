import { LOJA } from '../dados/loja'
import { statusLoja } from '../lib/horario'
import { brl } from '../lib/moeda'

export function ComoChegar() {
  const status = statusLoja()

  return (
    <section className="como-chegar" id="como-chegar">
      <h2 className="secao-titulo">Como chegar</h2>
      <div className="info-grade">
        <div className="info-cartao">
          <h3>Endereço</h3>
          <p>{LOJA.endereco}</p>
          <a className="botao botao-secundario" href={LOJA.linkMapa} target="_blank" rel="noreferrer">
            Abrir no mapa
          </a>
        </div>
        <div className="info-cartao">
          <h3>Funcionamento</h3>
          <p>{LOJA.horario.texto}</p>
          <p className={status.aberto ? 'texto-aberto' : 'texto-fechado'}>{status.mensagem}</p>
        </div>
        <div className="info-cartao">
          <h3>Entrega</h3>
          <p>Taxa de {brl(LOJA.taxaEntrega)}</p>
          <p>Pedido mínimo de {brl(LOJA.minimoEntrega)} para entrega.</p>
        </div>
      </div>
    </section>
  )
}
