import { useState } from 'react'
import { CarrinhoProvider } from './carrinho/CarrinhoContext'
import { Cabecalho } from './componentes/Cabecalho'
import { Hero } from './componentes/Hero'
import { Cardapio } from './componentes/Cardapio'
import { ComoChegar } from './componentes/ComoChegar'
import { Carrinho } from './componentes/Carrinho'
import { Rodape } from './componentes/Rodape'

export default function App() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

  return (
    <CarrinhoProvider>
      <Cabecalho aoAbrirCarrinho={() => setCarrinhoAberto(true)} />
      <main>
        <Hero />
        <Cardapio />
        <ComoChegar />
      </main>
      <Rodape />
      <Carrinho aberto={carrinhoAberto} aoFechar={() => setCarrinhoAberto(false)} />
    </CarrinhoProvider>
  )
}
