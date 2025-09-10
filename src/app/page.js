import '../../estilos/styles.scss'
import PreLanding from './preLanding'
export const metadata = {
  title: 'PokerLAP Todo Sobre Poker',
  description: 'Todo Sobre Poker enPokerLAP.com',
  images: [`https://www.pokerlap.com/img/ficha512.jpg`],
  image: `https://www.pokerlap.com/img/ficha512.jpg`,
  openGraph: {
    title: 'PokerLAP',
    description: 'Todo Sobre Poker enPokerLAP.com',
    images: [`https://www.pokerlap.com/img/ficha512.jpg`],
    image: `https://www.pokerlap.com/img/ficha512.jpg`,
  }
}
export default function Home() {

  return (
    <main className="main">
      <PreLanding seccion={0} />
    </main>
  )
}
