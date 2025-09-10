'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import PageHead from "../../components/body/pageHead"
import ClubIndividual from "./clubIndividual"
import ClubVistaIndividual from "./clubVista"
const feed = 10
const Clubs = (props) => {
    const { club = false, casinos = [], torneos = [], setOpt = console.log, lang = 'es' } = props
    const [clubExiste, setClubExiste] = useState({ state: false, club: {} })
    const [clubs, setClubs] = useState([])
    const [clubsAlimentador, setClubsAlimentador] = useState({ page: 0, max: feed, min: 0 })
    const [torneoClubs, setTorneoClubs] = useState([])
    useEffect(() => {
        let newClubs = []
        let newClubsT = []
        casinos.map((key, i) => {
            let existeClub = { state: false, torneos: [] }

            torneos.map((keyT, iT) => {
                if (key.ID_Club === keyT.ID_Club) {
                    newClubsT.push({ ...key, torneo: { state: true, torneo: keyT } })
                    existeClub.state = true
                    existeClub.torneos.push(keyT)
                }
            })
            newClubs.push({ ...key, ...existeClub })
        });
        setClubs(newClubs)
        setTorneoClubs(newClubsT)
        if (club) {
            let newClubs = []
            let newClubsT = []

            casinos.map((key, i) => {
                let existeClub = { torneo: false, torneos: [] }

                if (key.ID_Club === parseInt(club)) {
                    torneos.map((keyT, iT) => {
                        if (key.ID_Club === keyT.ID_Club && !existeClub.state) {
                            newClubsT.push({ ...key, torneo: { state: true, torneo: keyT } })
                            existeClub.torneo = true
                            existeClub.torneos.push(keyT)
                        }
                    })
                    newClubs.push({ ...key, ...existeClub })
                    setClubExiste({ ...clubExiste, state: true, club: { ...key, ...existeClub } })
                }
            })
        }


    }, [casinos, torneos])
    let counted = casinos.length / 10
    let pages = []

    for (let index = 0; index < counted; index++) {
        pages.push(index);

    }
    const FclubsAlimentador = (i) => {
        let newAlimentador = { page: i, max: (i * 10) + 10, min: i * 10 }
        setClubsAlimentador(newAlimentador)
    }
    return (
        <>
            <div className="clubs-container">
                <PageHead lang={lang} page={'Clubs'} club={club} subPage={clubExiste.club.Nombre} setOpt={setOpt} />
                {club ? <div className="fontcolor-black caontlist">{clubExiste.state ? <>
                    <ClubIndividual enClub torneos={torneos} clubs={clubs} club={clubExiste.club} />
                </> : <div className="fontcolor-black caontlist">
                    <h5 className="mb-10 mt-10" >{casinos.length > 0 ? 'PAGINA NO ENCONTRADA' : 'Cargando'}</h5>
                </div>

                }
                </div> :
                    <div className="caontlist">
                        <div className="clubs-container-list">
                            <input type="text" />
                            {
                                clubs.map((key, i) => {
                                    return (
                                        <>
                                            {key.Estado && key.Estado > 1 ? <div className={`clubs-valores-hijo${i} clubs-container-list-hijo`} key={`funciones-grid-${i}`} id={`funciones-grid-${i}`}>
                                                <li className="texto-titulo hover" onClick={(e) => { e.preventDefault(); window.location.replace(`./clubs/${key.ID_Club}`) }}>
                                                    {key.Nombre}
                                                </li>
                                            </div> : <></>}
                                        </>
                                    )
                                })
                            }


                        </div>
                        <div className="centered">
                            {/*  <div className="select-page">
                                {
                                    pages.map((key, i) => {
                                        return (
                                            <>
                                                {
                                                    <div onClick={(e) => { e.preventDefault(); FclubsAlimentador(i) }} className={(parseInt(clubsAlimentador.min / 10)) === i ? 'pagina-select pagina-select-selected' : "pagina-select"}>{key}</div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div> */}
                            <div className="paginadora">
                                <ul className="page">
                                    {clubsAlimentador.page > 0 && <Image onClick={(e) => { e.preventDefault(); FclubsAlimentador(clubsAlimentador.page - 1) }} className="hover" alt="chev" width={30} height={30} src={'/multimedia/icons/left.svg'} />
                                    }
                                    {
                                        pages.map((key, i) => {
                                            return (
                                                <>
                                                    {
                                                        <li onClick={(e) => { e.preventDefault(); FclubsAlimentador(i) }} className={(parseInt(clubsAlimentador.min / 10)) === i ? 'page__numbers active' : "page__numbers"}> {key + 1}</li>

                                                    }
                                                </>
                                            )
                                        })
                                    }
                                    {clubsAlimentador.page < (pages.length - 1) && <><Image className="hover" onClick={(e) => { e.preventDefault(); FclubsAlimentador(clubsAlimentador.page + 1) }} alt="chev" width={30} height={30} src={'/multimedia/icons/right.svg'} /></>}
                                    {/*     <li className="page__btn"><span className="material-icons">chevron_left</span></li>
                                    <li className="page__numbers active">2</li>
                                    <li className="page__numbers">3</li>
                                    <li className="page__numbers">4</li>
                                    <li className="page__numbers">5</li>
                                    <li className="page__numbers">6</li>
                                    <li className="page__dots">...</li>
                                    <li className="page__numbers"> 10</li>
                                    <li className="page__btn"><span class="material-icons">chevron_right</span></li> */}
                                </ul>
                            </div>
                            <div className="clubs-container-center ">

                                {
                                    clubs.map((key, i) => {
                                        return (
                                            <>
                                                {clubsAlimentador.max > i && clubsAlimentador.min <= i &&
                                                    <ClubVistaIndividual lang={lang} maping club={key} torneos={torneos} />}
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="paginadora">
                                <ul className="page">
                                    {clubsAlimentador.page > 0 && <Image onClick={(e) => { e.preventDefault(); FclubsAlimentador(clubsAlimentador.page - 1) }} className="hover" alt="chev" width={30} height={30} src={'/multimedia/icons/left.svg'} />
                                    }
                                    {
                                        pages.map((key, i) => {
                                            return (
                                                <>
                                                    {
                                                        <li onClick={(e) => { e.preventDefault(); FclubsAlimentador(i) }} className={(parseInt(clubsAlimentador.min / 10)) === i ? 'page__numbers active' : "page__numbers"}> {key + 1}</li>

                                                    }
                                                </>
                                            )
                                        })
                                    }
                                    {clubsAlimentador.page < (pages.length - 1) && <><Image className="hover" onClick={(e) => { e.preventDefault(); FclubsAlimentador(clubsAlimentador.page + 1) }} alt="chev" width={30} height={30} src={'/multimedia/icons/right.svg'} /></>}
                                    {/*     <li className="page__btn"><span className="material-icons">chevron_left</span></li>
                                    <li className="page__numbers active">2</li>
                                    <li className="page__numbers">3</li>
                                    <li className="page__numbers">4</li>
                                    <li className="page__numbers">5</li>
                                    <li className="page__numbers">6</li>
                                    <li className="page__dots">...</li>
                                    <li className="page__numbers"> 10</li>
                                    <li className="page__btn"><span class="material-icons">chevron_right</span></li> */}
                                </ul>
                            </div>

                        </div>
                    </div>}


            </div>
        </>

    )
}
export default Clubs


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
