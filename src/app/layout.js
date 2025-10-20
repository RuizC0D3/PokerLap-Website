// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import MenuBar from '../components/menuBar/menuBar'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Script from 'next/script'
import BoldReturnShim from './BoldReturnShim'

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
        <Script
          id="bold-lib"
          src="https://checkout.bold.co/library/boldPaymentButton.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <BoldReturnShim />
        {/* --- Navbar visible en TODAS las páginas --- */}
        <MenuBar />

        {/* --- Todo el contenido pagina --- */}
        {children}
      </body>
    </html>
  )
}
