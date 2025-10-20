// src/app/descargas/page.js
import '../../../estilos/styles.scss'
import Descargas from '../../paginas/descargas/descargas'

export const metadata = {
  title: 'PokerLAP Descargas',
  description: 'Descargas en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Descargas',
    description: 'Descarga herramientas para poker',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function DescargasPage() {
  return <Descargas />
}
