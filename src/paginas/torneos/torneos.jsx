'use client'

import { useEffect, useState } from "react"
import TorneoIndividual from "./torneoIndividual"
import { SaldoFix } from "../../fixSlado"
let windoewa = false
let resss = false, imagenesCorrectasAux = []

const Torneos = (props) => {
    const { torneoOpt = false, club = false, torneos = [], clubs = [], setOpt = console.log, lang = 'es' } = props
    const [inTorneo, setinTorneo] = useState({ state: false, torneo: -1 })
    const [torneoExiste, setTorneoExiste] = useState({ state: false, torneo: {} })
    const [imagenesCorrectas, setImagenesCorrectas] = useState([])

    const setInPage = () => {
        club ? window.location.replace(`./`) : setinTorneo({ state: false, torneo: -1 })
    }
    const ResgresarClubInfo = (clubIn) => {
        let res = { nombre: <></>, ID_Club: 0, logo: '' }
        clubs.map((key, i) => {
            if (key.Nombre && clubIn.ID_Club && key.ID_Club && clubIn.ID_Club === key.ID_Club) {
                res.nombre = <>{key.Nombre}</>
                res.ID_Club = key.ID_Club
                res.logo = key.logo
                return res

            }
        })
        return res
    }
    const crearT = () => {
        imagenesCorrectasAux = []
        torneos.map((key, i) => {
            imagenesCorrectasAux.push({ id: i, key: key, ok: false })

        })
        ResgresarImagenCorrect(0, imagenesCorrectasAux.length)
    }
    const ResgresarImagenCorrect = (pos, fin) => {
        const posc = pos
        if (posc < fin) {
            let imagen = new Image
            imagen.src = `https://img.pkti.me/club/${ResgresarClubInfo(imagenesCorrectasAux[posc].key).logo}`
            imagen.onload = () => {
                if (imagen.naturalHeight > 0) {
                    imagenesCorrectasAux[posc].ok = true

                } else {
                    imagenesCorrectasAux[posc].ok = false
                }
                ResgresarImagenCorrect(posc + 1, fin)
            }
            imagen.onerror = () => {
                imagenesCorrectasAux[posc].ok = false
                ResgresarImagenCorrect(posc + 1, fin)

            }
        } else {
            setTimeout(() => {
                setImagenesCorrectas(imagenesCorrectasAux)
            }, 1);
        }

    }
    useEffect(() => {
        if (club) {
            torneos.map((key, i) => {

                if (key.ID_Torneo === parseInt(club)) {
                    clubs.map((keyC, iC) => {
                        if (key.ID_Club === keyC.ID_Club) {
                            setTorneoExiste({ ...torneoExiste, state: true, torneo: { ...key, elClub: keyC } })

                            return
                        }
                    })
                }
            })
        }
        crearT()

        windoewa = true
    }, [clubs, torneos])

    return (
        <>
            <div className="clubs-container">
                <>
                    {club ? <>
                        <div className="caontlist">
                            <div className="clubs-container-center">
                                {!torneoExiste.state ? <>
                                    <h5 className="mb-10 mt-10">Página no encontrada</h5>
                                </> : <TorneoIndividual lang={lang} torneoOpt={torneoOpt} torneos={torneos} clubs={clubs} torneo={torneoExiste.torneo} />}
                            </div>
                        </div>
                    </> :
                        <>
                            {inTorneo.state ?
                                <div className="caontlist">
                                    <div className="clubs-container-center">
                                        <TorneoIndividual lang={lang} torneoOpt={torneoOpt} clubs={clubs} torneo={torneos[inTorneo.torneo]} />
                                    </div>
                                </div>
                                : <div className="caontlist">
                                    <div className="clubs-container-list">

                                        {
                                            torneos.map((key, i) => {
                                                return (
                                                    <>
                                                        <div onClick={(e) => { e.preventDefault(); window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/torneos/${key.ID_Torneo}`); setinTorneo({ ...inTorneo, state: true, torneo: i }) }} className={`hover clubs-valores-hijo${i} clubs-container-list-hijo`} key={`funciones-grid-${i}`} id={`funciones-grid-${i}`}>
                                                            <li className="texto-titulo">
                                                                {key.Club} - {key.Nombre}

                                                            </li>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                    </div>
                                    <div className="clubs-container-center">
                                    
                                        {
                                            imagenesCorrectas.length > 0 && torneos.map((key, i) => {
                                                return (
                                                    <div className="torContainer">
                                                        <div className="clubinfo">
                                                            <p>
                                                                {ResgresarClubInfo(key).nombre}
                                                            </p>

                                                            {imagenesCorrectas[i] && imagenesCorrectas[i].ok ? <img onClick={(e) => { e.preventDefault(); window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/clubs/${ResgresarClubInfo(key).ID_Club}`) }} src={`https://img.pkti.me/club/${ResgresarClubInfo(key).logo}`} alt="seccionesimg" className={"hover simg seccion-1-club"} /> : <img onClick={(e) => { e.preventDefault(); window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/clubs/${ResgresarClubInfo(key).ID_Club}`) }} src={`/multimedia/noimage.png`} alt="seccionesimg" className={"hover simg seccion-1-club"} />}

                                                        </div>   <div onClick={(e) => { e.preventDefault(); window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/torneos/${key.ID_Torneo}`); /* setinTorneo({ ...inTorneo, state: true, torneo: i }) */ }} className="hover torneo-torneo-xs torneo-torneo">
                                                            <h5 className="pdl-30 mb-15 mt-30 color-poker">{key.Nombre}</h5>
                                                            {key.Garantizado !== 0 && <h5 className="mb-30 mt-10 color-poker">Garantizado {SaldoFix(key.Garantizado)}</h5>}
                                                            <div className="datos fontcolorInedit-black">
                                                                <div className="font-size-20 align-center text-center dato fontcolorInedit-black">
                                                                    <span className="fts-xs  fontcolorInedit-black">Inicio: {key.Inicio}</span><><h6 className="color-poker minw-30">Fichas</h6></>

                                                                </div>
                                                                <div className="column gap-10">
                                                                    <div className="dato fontcolorInedit-black" >
                                                                        <span className="fontcolorInedit-black minW-100">Entrada</span><span className="fontcolorInedit-black minW-150">{SaldoFix(key.Entrada)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(key.FichasIni)}</span>


                                                                    </div>
                                                                    <div className="dato fontcolorInedit-black">
                                                                        <span className="fontcolorInedit-black minW-100">Recompra</span><span className="fontcolorInedit-black minW-150">{SaldoFix(key.Rebuy)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(key.FichasRein)}</span>

                                                                    </div>
                                                                    <div className="dato fontcolorInedit-black" >
                                                                        {key.Propina !== 0 && <> <span className="fontcolorInedit-black minW-100">Propina</span><span className="fontcolorInedit-black minW-150">{SaldoFix(key.Propina)}</span><span className="fontcolorInedit-poker minW-150 ">{SaldoFix(key.dtif)}</span></>}

                                                                    </div>
                                                                </div>
                                                                <div className="column gap-20">
                                                                    <div className="dato fontcolorInedit-black">
                                                                        <span className="fontcolorInedit-black">Reservas</span><span className="fontcolorInedit-black">{key.Reservas}</span>

                                                                    </div>
                                                                    <div className="dato fontcolorInedit-black">
                                                                        <p className="fontcolorInedit-black">Total Movimientos</p><span className="fontcolorInedit-black">{key.Jugadores}</span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>}
                        </>}
                </>

            </div >
        </>

    )
}
export default Torneos

export const Textos = {
    es: {
        suscribir: 'Suscribir'
    },
    en: {
        suscribir: ''
    },
    ger: {
        suscribir: ''
    },
    prt: {
        suscribir: ''
    },
    fr: {
        suscribir: ''
    }
}
