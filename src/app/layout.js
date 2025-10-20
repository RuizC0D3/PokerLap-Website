// app/layout.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Inter } from 'next/font/google'
import './globals.css'

// Font Awesome (evita inyectar CSS duplicado)
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Script from 'next/script'
import BoldReturnShim from './BoldReturnShim' // asegúrate que exista app/BoldReturnShim.jsx

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PokerLAP Todo Sobre Poker',
  description: 'Todo Sobre Poker en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP',
    description: 'Todo Sobre Poker en PokerLAP.com',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Librería de Bold: cargada una sola vez a nivel app */}
        <Script
          id="bold-lib"
          src="https://checkout.bold.co/library/boldPaymentButton.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {/* Shim que detecta ?bold-order-id & ?bold-tx-status y redirige a /tienda */}
        <BoldReturnShim />
        {children}
      </body>
    </html>
  )
}
