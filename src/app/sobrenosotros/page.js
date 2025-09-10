import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'
export const metadata = {
  title: 'PokerLAP Acerca De Nosotros',
  description: 'Acerca De Nosotros enPokerLAP.com',
  images: [`https://www.pokerlap.com/img/ficha512.jpg`],
  image: `https://www.pokerlap.com/img/ficha512.jpg`,
  openGraph: {
    title: 'PokerLAP',
    description: 'Acerca De Nosotros enPokerLAP.com',
    images: [`https://www.pokerlap.com/img/ficha512.jpg`],
    image: `https://www.pokerlap.com/img/ficha512.jpg`,
  }
}
export default function Home() {

  return (
    <main className="main">
      <PreLanding seccion={3} />
    </main>
  )
}
