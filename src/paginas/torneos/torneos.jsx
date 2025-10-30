'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import TorneoIndividual from "./torneoIndividual"
import { SaldoFix } from "../../fixSlado"

let imagenesCorrectasAux = []

const Torneos = (props) => {
    const { club = false, torneos = [], clubs = [] } = props
    const router = useRouter()
    const [torneoExiste, setTorneoExiste] = useState({ state: false, torneo: {} })
    const [imagenesCorrectas, setImagenesCorrectas] = useState([])

    const ResgresarClubInfo = (clubIn) => {
        let res = { nombre: <></>, ID_Club: 0, logo: '' }
        clubs.forEach((key) => {
            if (key.Nombre && clubIn?.ID_Club && key.ID_Club === clubIn.ID_Club) {
                res = { nombre: <>{key.Nombre}</>, ID_Club: key.ID_Club, logo: key.logo }
            }
        })
        return res
    }

    const cargarImagenes = () => {
        imagenesCorrectasAux = torneos.map((key, i) => ({ id: i, key, ok: false }))
        verificarImagenes(0)
    }

    const verificarImagenes = (pos) => {
        if (pos >= imagenesCorrectasAux.length) {
            setImagenesCorrectas([...imagenesCorrectasAux])
            return
        }

        const imagen = new Image()
        const clubInfo = ResgresarClubInfo(imagenesCorrectasAux[pos].key)
        imagen.src = `https://img.pkti.me/club/${clubInfo.logo}`
        
        imagen.onload = () => {
            imagenesCorrectasAux[pos].ok = imagen.naturalHeight > 0
            verificarImagenes(pos + 1)
        }
        
        imagen.onerror = () => {
            imagenesCorrectasAux[pos].ok = false
            verificarImagenes(pos + 1)
        }
    }

    useEffect(() => {
        if (club) {
            const torneoEncontrado = torneos.find(t => t.ID_Torneo === parseInt(club))
            if (torneoEncontrado) {
                const clubEncontrado = clubs.find(c => c.ID_Club === torneoEncontrado.ID_Club)
                setTorneoExiste({
                    state: true,
                    torneo: { ...torneoEncontrado, elClub: clubEncontrado }
                })
            }
        } else {
            cargarImagenes()
        }
    }, [club, torneos, clubs])

    // VISTA DETALLE
    if (club && torneoExiste.state) {
        return (
            <div className="torneos-detalle">
                <TorneoIndividual torneo={torneoExiste.torneo} clubs={clubs} torneos={torneos} />
            </div>
        )
    }

    if (club && !torneoExiste.state) {
        return <div className="torneos-detalle"><h5>Torneo no encontrado</h5></div>
    }

    // VISTA LISTA
    return (
        <div className="torneos-lista-container">
            <div className="torneos-lista-menu">
                {torneos.map((key) => (
                    <div
                        key={key.ID_Torneo}
                        className="torneos-menu-item"
                        onClick={() => router.push(`/torneos/${key.ID_Torneo}`)}
                    >
                        {key.Club} - {key.Nombre}
                    </div>
                ))}
            </div>

            <div className="torneos-lista-grid">
                {imagenesCorrectas.length > 0 && torneos.map((key, idx) => (
                    <div
                        key={key.ID_Torneo}
                        className={`torneos-card ${idx === 0 ? 'torneos-card-featured' : ''}`}
                        onClick={() => router.push(`/torneos/${key.ID_Torneo}`)}
                    >
                        <div className="torneos-card-header">
                            <p>{ResgresarClubInfo(key).nombre}</p>
                            {imagenesCorrectas[idx]?.ok ? (
                                <img src={`https://img.pkti.me/club/${ResgresarClubInfo(key).logo}`} alt="club" />
                            ) : (
                                <img src="/multimedia/noimage.png" alt="club" />
                            )}
                        </div>

                        <div className="torneos-card-body">
                            <h5>{key.Nombre}</h5>
                            {key.Garantizado !== 0 && <p className="torneos-garantizado">Garantizado {SaldoFix(key.Garantizado)}</p>}
                            
                            <div className="torneos-info">Inicio: {key.Inicio}</div>

                            <div className="torneos-datos">
                                <div className="torneos-dato">
                                    <span>Entrada</span>
                                    <span>{SaldoFix(key.Entrada)}</span>
                                    <span className="torneos-fichas">{SaldoFix(key.FichasIni)}</span>
                                </div>

                                <div className="torneos-dato">
                                    <span>Recompra</span>
                                    <span>{SaldoFix(key.Rebuy)}</span>
                                    <span className="torneos-fichas">{SaldoFix(key.FichasRein)}</span>
                                </div>

                                {key.Propina !== 0 && (
                                    <div className="torneos-dato">
                                        <span>Propina</span>
                                        <span>{SaldoFix(key.Propina)}</span>
                                        <span className="torneos-fichas">{SaldoFix(key.dtif)}</span>
                                    </div>
                                )}

                                <div className="torneos-dato">
                                    <span>Reservas</span>
                                    <span colSpan="2">{key.Reservas}</span>
                                </div>

                                <div className="torneos-dato">
                                    <span>Total</span>
                                    <span colSpan="2">{key.Jugadores}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Torneos