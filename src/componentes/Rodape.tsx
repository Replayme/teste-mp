import { LOJA } from '../dados/loja'

export function Rodape() {
  return (
    <footer className="rodape">
      <p className="rodape-marca">{LOJA.nome}</p>
      <p>{LOJA.horario.texto}</p>
      <p className="rodape-fino">Pedidos pelo WhatsApp · {LOJA.endereco}</p>
    </footer>
  )
}
