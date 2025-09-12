import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP Tienda',
  description: 'Tienda en PokerLAP.com',
  images: ['https://www.pokerlap.com/img/ficha512.jpg'],
  image: 'https://www.pokerlap.com/img/ficha512.jpg',
  openGraph: {
    title: 'PokerLAP',
    description: 'Tienda en PokerLAP.com',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    image: 'https://www.pokerlap.com/img/ficha512.jpg',
  }
}

export default function Page() {
  return (
      <main className="main">
      <PreLanding seccion={6} />
    </main>
  )
}

