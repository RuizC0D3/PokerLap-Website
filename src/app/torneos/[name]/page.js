import '../../../../estilos/styles.scss'
import PreLanding from '../../preLanding'
let resArray = []
import { headers } from 'next/headers';
export async function generateMetadata({ params, searchParams }, parent) {
  const headersList = headers();
  const pathname = headersList.get("x-current-path");

  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  let Iid = searchParams.id
  const Nname = searchParams.name
  const Iimg = searchParams.img
  const Itype = searchParams.type
  if (pathname && pathname.split('torneos') && pathname.split('torneos')[1]) {
    let pathN = pathname.split('torneos')[1].replace('/', '');
    Iid = !isNaN(parseInt(pathN)) ? parseInt(pathN) : Iid
    console.log('Iid', Iid,);
  }
  const doIt = async () => {
    const raw = JSON.stringify({ "q": "Torneo_Listar", "p": ["CO", 1000] });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw
    };
    const desed = async (txto) => {
      const elT = await txto.text();
      const resArraya = JSON.parse(elT);
      resArray = JSON.parse(elT);
      return resArraya
    }
    resArray = await fetch("https://api.pkti.me/db", requestOptions)
      .then(async (response) => await desed(response))
      .catch((error) => console.error(error));
  }
  await doIt()

  let moreW = ' Todo sobre Poker'
  let word = `PokerLAP Torneos  `
  let laimg = `https://www.pokerlap.com/img/ficha512.jpg`
  resArray.map((key, i) => {
    if (key.ID_Torneo === Iid) {
      word = `${key.Club}`
      moreW = `${key.Nombre}`
      laimg = `https://img.pkti.me/club/${key.Logo} `
    }
  })
  const resA = {
    title: word,
    description: moreW,
    images: [laimg],
    image: laimg,
    openGraph: {
      title: word,
      description: moreW,
      images: [laimg],
      image: laimg
    }
  }
  console.log(resA);

  return resA
}
export default function Home(props) {

  return (
    <main className="main">
      <PreLanding seccion={2} club={props.params.name} />
    </main>
  )
}
