import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP Clubs',
  description: 'Clubs enPokerLAP.com',
  images: [`https://www.pokerlap.com/img/ficha512.jpg`],
  image: `https://www.pokerlap.com/img/ficha512.jpg`,
  openGraph: {
    title: 'PokerLAP',
    description: 'Clubs enPokerLAP.com',
    images: [`https://www.pokerlap.com/img/ficha512.jpg`],
    image: `https://www.pokerlap.com/img/ficha512.jpg`,
  }
}
export default function Home() {

  return (
    <main className="main">
      <PreLanding seccion={1} />
    </main>
  )
}
