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
    id: 'basic', name: 'Básico', description: 'Acceso básico mensual', amountCop: 200000, amountUsd: 50,
    payment_methods: undefined
  },
  {
    id: 'pro', name: 'Pro', description: 'Funciones avanzadas', amountCop: 400000, amountUsd: 100,
    payment_methods: undefined
  },
  {
    id: 'elite', name: 'Elite', description: 'Todo ilimitado', amountCop: 800000, amountUsd: 200,
    payment_methods: undefined
  },
];

export function getPlanById(id: string) {
  return CATALOGO.find(p => p.id === id) || null;
}
