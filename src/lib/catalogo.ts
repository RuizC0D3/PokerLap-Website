export type Plan = {
  payment_methods: ("CREDIT_CARD" | "PSE" | "NEQUI" | "BOTON_BANCOLOMBIA")[] | undefined;
  id: string;
  name: string;
  description: string;
  amountCop: number;   // para Bold
  amountUsd: number;   // para Coinbase 
};

export const CATALOGO: Plan[] = [
  {
    id: 'Carta alta', name: 'Carta alta', description: 'Acceso básico mensual', amountCop: 200000, amountUsd: 50,
    payment_methods: undefined
  },
  {
    id: 'Par', name: 'Par', description: 'Funciones avanzadas', amountCop: 400000, amountUsd: 100,
    payment_methods: undefined
  },
  {
    id: 'Trio', name: 'Trio', description: 'Todo ilimitado', amountCop: 600000, amountUsd: 150,
    payment_methods: undefined
  },
  {
    id: 'Full', name: 'Full', description: 'Acceso básico mensual', amountCop: 800000, amountUsd: 200,
    payment_methods: undefined
  },
  {
    id: 'Poker', name: 'Poker', description: 'Funciones avanzadas', amountCop: 1000000, amountUsd: 250,
    payment_methods: undefined
  },
  {
    id: 'Escalera real', name: 'Escalera real', description: 'Todo ilimitado', amountCop: 1200000, amountUsd: 300,
    payment_methods: undefined
  },
];

export function getPlanById(id: string) {
  return CATALOGO.find(p => p.id === id) || null;
}

/* https://api.pkti.me/tienda */