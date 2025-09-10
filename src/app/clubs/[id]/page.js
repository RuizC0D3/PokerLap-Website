import '../../../../estilos/styles.scss'
import PreLanding from '../../preLanding'
import { headers } from 'next/headers';

let resArray = []
let elId = false
let firsDatos = false
let elDato = false
let Iid = 'id'
let Nname = 'name'
let Iimg = 'img'
let Itype = 'png'
export async function generateMetadata({ params, searchParams }, parent) {
  const headersList = headers();
  let Iid = searchParams.id
  const pathname = headersList.get("x-current-path");
  const Nname = searchParams.name
  const Iimg = searchParams.img
  const Itype = searchParams.type
  if (pathname && pathname.split('clubs') && pathname.split('clubs')[1]) {
    let pathN = pathname.split('clubs')[1].replace('/', '');
    Iid = !isNaN(parseInt(pathN)) ? parseInt(pathN) : Iid
    console.log('Iid', Iid,);
  }
  const doIt = async () => {
    const raw = JSON.stringify({
      "q": "Club_Listar",
      "p": [
        "CO"
      ]
    });
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
  let word = `PokerLAP Clubs  `
  let laimg = `https://www.pokerlap.com/img/ficha512.jpg`
  resArray.map((key, i) => {
    if (key.ID_Club === parseInt(Iid)) {
      word = `Club ${key.Nombre}`
      moreW = key.Direccion
      laimg = `https://img.pkti.me/club/${key.logo} `
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
    <>

      <main className="main">
        <PreLanding seccion={1} club={props.params.id} />
      </main>
    </>

  )
}
