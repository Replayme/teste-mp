import { LOJA } from '../dados/loja'

export function Hero() {
  return (
    <section className="hero">
      <p className="hero-ornamento" aria-hidden="true">✦ ─────── ✦</p>
      <h1 className="hero-titulo">{LOJA.chamada}</h1>
      <p className="hero-sub">
        {LOJA.horario.texto} · Almoço · Cafés · Bolos · Salgados · Cervejas
      </p>
      <a className="botao botao-primario" href="#cardapio">
        Ver cardápio
      </a>
    </section>
  )
}
