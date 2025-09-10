'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import GooglMapsComp from "../../components/mapas/googleMaps"
import { modeloTorneo } from "../../modelos/modeloTorneo"
import { SaldoFix } from "../../fixSlado"
import ResgresarImagenCorrecta from "../../funciones/regresarImg"
import TorneoInteractivo from "./torneoInteractivo/components/torneoInteractivo/torneoInteractivo"
const TorneoIndividual = (props) => {
    const { torneoOpt = false, lang = 'es', enClub = false, torneo = modeloTorneo(), clubs = {}, torneoIndividual = [], setOpt = console.log } = props
    const [enTorneo, setenTorneo] = useState({ ...modeloTorneo(), ...torneo })
    const [torneoData, settorneoData] = useState(false)
    const [onShare, setOnShare] = useState(false)
    const [charged, setcharged] = useState(true)
    const [mapsValue, setmapsValue] = useState({
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })
    useEffect(() => {
        setenTorneo(torneo)
        clubs.map((key, i) => {
            if (key.ID_Club === torneo.ID_Club) {
                let newtorneo = enTorneo
                newtorneo = { ...newtorneo, elClub: { ...key, state: true } }
                setmapsValue({
                    ...mapsValue,
                    region: {
                        ...mapsValue.region,
                        latitude: enTorneo.elClub.lat,
                        longitude: enTorneo.elClub.lon
                    }
                })
                setenTorneo(newtorneo)
                return
            }
        })
        setcharged(false)
        setTimeout(() => {
            setcharged(true)
        }, 10);

    }, [clubs, torneo])
    useEffect(() => {
        if (torneoOpt.Datos && torneoOpt.Datos[0] && torneoOpt.Datos[0].ID_Torneo) {
            if (torneoOpt.Tipo && torneoOpt.Tipo === "Torneo") {
                try {
                    let newTorneoData = { ...torneoOpt.Datos[0], Estructura: JSON.parse(torneoOpt.Datos[0].Estructura), Premios: JSON.parse(torneoOpt.Datos[0].Premios), ColorFicha: JSON.parse(torneoOpt.Datos[0].ColorFicha) }
                    console.log(newTorneoData, 'newTorneoData', torneoOpt);
                    settorneoData({ ...torneoData, ...newTorneoData })
                } catch (error) {
                    console.log(error, 'error', torneoOpt);
                }
            }
        }

    }, [torneoOpt])

    const ResgresarImagenCorrect = async (url) => {
        return await ResgresarImagenCorrecta(url, 1)
    }

    return (
        <>
            {charged && <>
                <div className="torneo-container">

                    <div className={` clubs-valores-hijo clubs-container-center-hijo-flex-row`} torneo={`funciones-grid-sasas`} id={`funciones-grid-sasas`}>
                        <div className="torneo-casino">
                            {!onShare ? <div className="torneoShare" onClick={(e) => { e.preventDefault(); setOnShare(true) }} >
                                <Image src={`/servicios/share.png`} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                            </div> : <><div className="abshare">
                                <span onClick={(e) => { e.preventDefault(); setOnShare(false) }} className="hover">X</span>
                                Share on
                                <Image src={`/servicios/whatsapp.png`} onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/?text=https://www.pokerlap.com/torneos/${enTorneo.ID_Torneo}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                <Image src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg=="} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.pokerlap.com/torneos/${enTorneo.ID_Torneo}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                            </div></>}
                            <div className="hover torneo-casino-club" onClick={(e) => { e.preventDefault(); !enClub && enTorneo.elClub && window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/clubs/${enTorneo.elClub.ID_Club}`) }} >
                                {enTorneo.Logo !== '' ? <>{ResgresarImagenCorrect(`https://img.pkti.me/club/${enTorneo.logo}`, 2) ? <img src={`https://img.pkti.me/club/${enTorneo.Logo}`} className="brdr10" alt="seccionesimg" /> : <Image src={`/multimedia/noimage.png`} className="brdr10" alt="seccionesimg" height={400} width={400} />}</> : <Image src={`/multimedia/noimage.png`} className="brdr10" alt="seccionesimg" height={400} width={400} />}
                            </div>
                            <div className="torneo-casino-mapa">
                                {enTorneo.elClub && enTorneo.elClub.state &&
                                    <>
                                        {/*   <Marker
                                                coordinate={{ latitude: enTorneo.elClub.lat, longitude: enTorneo.elClub.lon }}

                                            /> */}
                                    </>

                                }
                                {enTorneo.elClub && enTorneo.elClub.state && <GooglMapsComp openUrl={(e) => { e.preventDefault(); window.open(`https://www.google.es/maps?q=${enTorneo.elClub.lat},${enTorneo.elClub.lon}`) }} nombreClub={enTorneo.Club} ubicacion={{ lat: enTorneo.elClub.lat, lon: enTorneo.elClub.lon }} />}
                            </div>
                        </div>
                        <div className="wrap flex-row">
                            <div className="torneofull">
                                <div className="tor">
                                    <div className="flex-row align-center just-center">
                                        <h2>{enTorneo.Club}</h2>
                                    </div>
                                    <div className="torneo-torneo-xs torneo-torneo">
                                        <h5 className="pdl-30 mb-15 mt-30 color-poker">{enTorneo.Nombre}</h5>
                                        {enTorneo.Garantizado !== 0 && <h5 className="mb-30 mt-10 color-poker">Garantizado {SaldoFix(enTorneo.Garantizado)}</h5>}
                                        <div className="datos fontcolorInedit-black">
                                            <div className="font-size-20 align-center text-center dato fontcolorInedit-black">
                                                <span className="fts-xs  fontcolorInedit-black">Inicio: {enTorneo.Inicio}</span><><h6 className="color-poker minw-30">Fichas</h6></>

                                            </div>
                                            <div className="column gap-10">
                                                <div className="dato fontcolorInedit-black" >
                                                    <span className="fontcolorInedit-black minW-100">Entrada</span><span className="fontcolorInedit-black minW-150">{SaldoFix(enTorneo.Entrada)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(enTorneo.FichasIni)}</span>


                                                </div>
                                                <div className="dato fontcolorInedit-black">
                                                    <span className="fontcolorInedit-black minW-100">Recompra</span><span className="fontcolorInedit-black minW-150">{SaldoFix(enTorneo.Rebuy)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(enTorneo.FichasRein)}</span>

                                                </div>
                                                <div className="dato fontcolorInedit-black" >
                                                    {enTorneo.Propina !== 0 && <> <span className="fontcolorInedit-black minW-100">Propina</span><span className="fontcolorInedit-black minW-150">{SaldoFix(enTorneo.Propina)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(enTorneo.dtif)}</span></>}

                                                </div>
                                            </div>
                                            <div className="column gap-20">
                                                <div className="dato fontcolorInedit-black">
                                                    <span className="fontcolorInedit-black">Reservas</span><span className="fontcolorInedit-black">{enTorneo.Reservas}</span>

                                                </div>
                                                <div className="dato fontcolorInedit-black">
                                                    <p className="fontcolorInedit-black">Total Movimientos</p><span className="fontcolorInedit-black">{enTorneo.Jugadores}</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {torneoOpt && <div className="torin"><TorneoInteractivo  lang={lang} elTorneo={enTorneo.ID_Torneo} torneoData={torneoData} /></div>}

                </div>
            </>}
        </>

    )
}
export default TorneoIndividual


