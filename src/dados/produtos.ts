export type Categoria = 'salgados' | 'almoco' | 'cafes' | 'doces' | 'bebidas'

export interface Produto {
  id: string
  nome: string
  descricao: string
  /** Preço em CENTAVOS. 1290 = R$ 12,90. */
  preco: number
  categoria: Categoria
  /** Espaço reservado enquanto não há foto. */
  emoji: string
  /**
   * Caminho da foto, ex: '/produtos/coxinha.jpg'.
   * Coloque o arquivo em public/produtos/ e referencie a partir da raiz.
   * Sem foto, o cartão mostra o emoji — nada quebra.
   */
  imagem?: string
  destaque?: boolean
  /** Fora de estoque some do cardápio sem precisar apagar o item. */
  indisponivel?: boolean
}

export const CATEGORIAS: { id: Categoria; nome: string }[] = [
  { id: 'salgados', nome: 'Salgados' },
  { id: 'almoco', nome: 'Almoço' },
  { id: 'cafes', nome: 'Cafés' },
  { id: 'doces', nome: 'Bolos e Doces' },
  { id: 'bebidas', nome: 'Bebidas' },
]

/**
 * CARDÁPIO — preços são PROVISÓRIOS, colocados só para o site funcionar.
 * Substitua nome, descrição e preço pelos valores reais da loja.
 */
export const PRODUTOS: Produto[] = [
  { id: 'coxinha-frango', nome: 'Coxinha de Frango', descricao: 'Massa artesanal com recheio cremoso de frango desfiado', preco: 900, categoria: 'salgados', emoji: '🍗', destaque: true },
  { id: 'empada-palmito', nome: 'Empada de Palmito', descricao: 'Massa amanteigada com palmito refogado', preco: 950, categoria: 'salgados', emoji: '🥧' },
  { id: 'pao-queijo', nome: 'Pão de Queijo', descricao: 'Assado na hora, servido quentinho', preco: 600, categoria: 'salgados', emoji: '🧀' },
  { id: 'esfiha-carne', nome: 'Esfiha de Carne', descricao: 'Aberta, temperada na medida', preco: 850, categoria: 'salgados', emoji: '🥟' },

  { id: 'prato-feito', nome: 'Prato do Dia', descricao: 'Arroz, feijão, guarnição e proteína do dia', preco: 3200, categoria: 'almoco', emoji: '🍛', destaque: true },
  { id: 'strogonoff', nome: 'Strogonoff de Frango', descricao: 'Com arroz branco e batata palha', preco: 3600, categoria: 'almoco', emoji: '🍚' },
  { id: 'salada-bistro', nome: 'Salada do Bistrô', descricao: 'Folhas, tomate seco, grãos e molho da casa', preco: 2800, categoria: 'almoco', emoji: '🥗' },

  { id: 'espresso', nome: 'Espresso', descricao: 'Grão selecionado, extração curta', preco: 700, categoria: 'cafes', emoji: '☕' },
  { id: 'cappuccino', nome: 'Cappuccino', descricao: 'Espresso, leite vaporizado e canela', preco: 1200, categoria: 'cafes', emoji: '☕' },
  { id: 'latte', nome: 'Café com Leite', descricao: 'Cremoso, na xícara grande', preco: 1000, categoria: 'cafes', emoji: '🥛' },

  { id: 'bolo-cenoura', nome: 'Bolo de Cenoura', descricao: 'Fatia generosa com cobertura de chocolate', preco: 1100, categoria: 'doces', emoji: '🍰', destaque: true },
  { id: 'bolo-fuba', nome: 'Bolo de Fubá', descricao: 'Receita de casa, com erva-doce', preco: 1000, categoria: 'doces', emoji: '🍰' },
  { id: 'brownie', nome: 'Brownie', descricao: 'Chocolate meio amargo com nozes', preco: 1400, categoria: 'doces', emoji: '🍫' },

  { id: 'milkshake', nome: 'Milkshake', descricao: 'Chantilly e calda de chocolate', preco: 1800, categoria: 'bebidas', emoji: '🥤', destaque: true },
  { id: 'suco-natural', nome: 'Suco Natural', descricao: 'Fruta da estação, feito na hora', preco: 1100, categoria: 'bebidas', emoji: '🍊' },
  { id: 'cerveja-long', nome: 'Cerveja Long Neck', descricao: 'Gelada, para o happy hour', preco: 1200, categoria: 'bebidas', emoji: '🍺' },
]
