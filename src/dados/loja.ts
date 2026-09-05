/** Dados institucionais da loja. Único lugar para editar contato, horário e taxas. */
export const LOJA = {
  nome: 'Cacilda & Lola',
  subtitulo: 'café · bistrô',
  chamada: 'O único Bistrô em Santa Cruz, do almoço ao Happy Hour',

  /**
   * ATENÇÃO: número no formato internacional, só dígitos (55 + DDD + número).
   * O link atual do site (wa.me/message/YPTQ6KLXK5G3P1) é um convite e NÃO
   * aceita texto pré-preenchido — por isso o pedido precisa do número cru.
   */
  whatsapp: '5500000000000',

  endereco: 'Santa Cruz — endereço completo a confirmar',
  linkMapa: 'https://maps.app.goo.gl/7tw5AMoyaGr7JiWv5',
  instagram: 'https://www.instagram.com/',

  /** Taxa de entrega em centavos. */
  taxaEntrega: 800,
  /** Pedido mínimo para entrega, em centavos. */
  minimoEntrega: 2500,

  horario: {
    /** 0 = domingo … 6 = sábado. Fecha domingo. */
    diasAbertos: [1, 2, 3, 4, 5, 6],
    abreMin: 11 * 60,
    fechaMin: 19 * 60,
    texto: 'Segunda a sábado, das 11h às 19h',
  },
} as const
