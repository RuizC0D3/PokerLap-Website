
import Landing from '../components/home'

const testing = true
let init = false, initu = true
let res = parseInt(Math.random() * 800000 + 100000)
export const metadata = {
    title: `PokerLAP Clubs Individual ss`,
    description: 'Todo sobre poker ',
    image: 'https://nextjs.org/imgs/sticker.png',

}
const PreLanding = (props = { seccion: 0, club: false, delact: false }) => {


    return (
        <>

            <Landing res={props.seccion} club={props.club} delact={props.delact} />
        </>
    )
}
export default PreLanding



