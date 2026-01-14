'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import TorneoIndividual from "./torneoIndividual"
import { SaldoFix } from "../../fixSlado"

let imagenesCorrectasAux = []

const Torneos = (props) => {
    const { club = false, torneos = [], clubs = [] } = props
    const router = useRouter()
    const searchParams = useSearchParams()
    const torneoId = searchParams.get('club')
    
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
        if (torneoId) {
            const torneoEncontrado = torneos.find(t => t.ID_Torneo === parseInt(torneoId))
            if (torneoEncontrado) {
                const clubEncontrado = clubs.find(c => c.ID_Club === torneoEncontrado.ID_Club)
                setTorneoExiste({ state: true, torneo: { ...torneoEncontrado, elClub: clubEncontrado } })
            }
        } else {
            cargarImagenes()
        }
    }, [torneoId, torneos, clubs])

    // VISTA DETALLE
    if (torneoId && torneoExiste.state) {
        return (
            <TorneoIndividual
                torneo={torneoExiste.torneo}
                torneos={torneos}
                clubs={clubs || []}
                onClick={() => {
                    setTorneoExiste({ state: false, torneo: {} })
                    router.push('/torneos')
                }}
            />
        )
    }

    // VISTA LISTA
    return (
        <div className="torneos-lista-grid">
            {torneos.map((key, idx) => (
                <div
                    key={idx}
                    className={`torneos-card ${key.Destacado === 1 ? 'torneos-card-featured' : ''} ${idx === 0 ? 'torneos-card-first' : ''}`}
                    onClick={() => {
                        router.push(`/torneos?club=${key.ID_Torneo}`)
                    }}
                >
                    {/* HEADER CON LOGO */}
                    <div className="torneos-card-header">
                        <p>{ResgresarClubInfo(key).nombre}</p>
                        {imagenesCorrectas[idx]?.ok ? (
                            <img 
                                src={`https://img.pkti.me/club/${ResgresarClubInfo(key).logo}`} 
                                alt={ResgresarClubInfo(key).nombre}
                                onError={(e) => e.target.src = '/multimedia/noimage.png'}
                            />
                        ) : (
                            <img 
                                src="/multimedia/noimage.png"
                                alt="Sin imagen"
                            />
                        )}
                    </div>

                    {/* CONTENIDO PRINCIPAL */}
                    <div className="torneos-card-body">
                        <h5>{key.Nombre}</h5>
                        
                        {/* GARANTIZADO */}
                        {key.Garantizado > 0 && (
                            <p className="torneos-garantizado">
                                💰 Garantizado: {SaldoFix(key.Garantizado)}
                            </p>
                        )}

                        {/* ENTRADA */}
                        {key.Entrada > 0 && (
                            <p className="torneos-entrada">
                                🎟️ Entrada: {SaldoFix(key.Entrada)}
                            </p>
                        )}
                        
                        {/* DESCRIPCIÓN */}
                        {key.Descripcion && (
                            <p className="torneos-info">{key.Descripcion}</p>
                        )}
                    </div>

                    {/* DATOS FINALES */}
                    <div className="torneos-datos">
                        {/* FILA 1 - INICIO */}
                        <div className="torneos-dato">
                            <span>📅 INICIO</span>
                            <span>
                                {key.FechaHora 
                                    ? new Date(key.FechaHora).toLocaleDateString('es-ES')
                                    : 'N/A'
                                }
                            </span>
                        </div>

                        {/* FILA 2 - HORA */}
                        <div className="torneos-dato">
                            <span>🕐 HORA</span>
                            <span>
                                {key.FechaHora 
                                    ? new Date(key.FechaHora).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})
                                    : 'N/A'
                                }
                            </span>
                        </div>

                        {/* FILA 3 - TIPO */}
                        <div className="torneos-dato">
                            <span>🎯 TIPO</span>
                            <span>{key.Tipo || 'N/A'}</span>
                        </div>
                    </div>

                    {/* BADGE DESTACADO */}
                    {key.Destacado === 1 && (
                        <div className="torneos-card-badge">⭐ DESTACADO</div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Torneos
