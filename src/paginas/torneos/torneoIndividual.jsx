'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import GooglMapsComp from "../../components/mapas/googleMaps"
import { SaldoFix } from "../../fixSlado"

const TorneoIndividual = (props) => {
    const { torneo = {}, torneos = [], clubs = [], onClick = () => {} } = props
    const router = useRouter()
    const [selectedTorneo, setSelectedTorneo] = useState(torneo)

    const getClubInfo = (idClub) => {
        return clubs.find(c => c.ID_Club === idClub) || torneo.elClub || {}
    }

    const torneosDelClub = torneos.filter(t => t.ID_Club === selectedTorneo.ID_Club)

    return (
        <div className="torneo-detail-page">
            {/* BOTÓN VOLVER */}
            <button 
                className="btn-volver-torneos"
                onClick={() => {
                    onClick()
                    router.push('/torneos')
                }}
            >
                ← Volver a Torneos
            </button>

            <div className="torneo-detail-wrapper">
                {/* HEADER PRINCIPAL */}
                <div className="torneo-header-main">
                    <div className="header-logo">
                        <img 
                            src={`https://img.pkti.me/club/${getClubInfo(selectedTorneo.ID_Club)?.logo || 'default'}`}
                            alt={getClubInfo(selectedTorneo.ID_Club)?.Nombre}
                            onError={(e) => e.target.src = '/multimedia/noimage.png'}
                        />
                    </div>
                    <div className="header-content">
                        <h1>{selectedTorneo.Nombre || 'Torneo'}</h1>
                        <p className="header-club">{getClubInfo(selectedTorneo.ID_Club)?.Nombre}</p>
                        {selectedTorneo.Destacado === 1 && (
                            <span className="badge-destacado">⭐ TORNEO DESTACADO</span>
                        )}
                    </div>
                </div>

                {/* GARANTIZADO - PROMINENTE */}
                {selectedTorneo.Garantizado > 0 && (
                    <div className="torneo-garantizado-banner">
                        <div className="garantizado-inner">
                            <span className="garantizado-label">GARANTIZADO</span>
                            <span className="garantizado-monto">{SaldoFix(selectedTorneo.Garantizado)}</span>
                        </div>
                    </div>
                )}

                {/* DESCRIPCIÓN */}
                {selectedTorneo.Descripcion && (
                    <div className="torneo-descripcion">
                        <p>{selectedTorneo.Descripcion}</p>
                    </div>
                )}

                {/* GRID DE INFORMACIÓN */}
                <div className="torneo-info-grid">
                    <div className="info-card">
                        <span className="info-icon">📅</span>
                        <span className="info-label">INICIO</span>
                        <span className="info-value">
                            {selectedTorneo.FechaHora 
                                ? new Date(selectedTorneo.FechaHora).toLocaleDateString('es-ES')
                                : 'N/A'
                            }
                        </span>
                    </div>

                    <div className="info-card">
                        <span className="info-icon">🕐</span>
                        <span className="info-label">HORA</span>
                        <span className="info-value">
                            {selectedTorneo.FechaHora 
                                ? new Date(selectedTorneo.FechaHora).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})
                                : 'N/A'
                            }
                        </span>
                    </div>

                    <div className="info-card">
                        <span className="info-icon">🎯</span>
                        <span className="info-label">TIPO</span>
                        <span className="info-value">{selectedTorneo.Tipo || 'N/A'}</span>
                    </div>

                    <div className="info-card">
                        <span className="info-icon">⚡</span>
                        <span className="info-label">ESTADO</span>
                        <span className="info-value">{selectedTorneo.Estado || 'Activo'}</span>
                    </div>

                    <div className="info-card">
                        <span className="info-icon">👥</span>
                        <span className="info-label">JUGADORES</span>
                        <span className="info-value">{selectedTorneo.Jugadores || 'N/A'}</span>
                    </div>

                    {selectedTorneo.BuyIn > 0 && (
                        <div className="info-card highlight">
                            <span className="info-icon">💵</span>
                            <span className="info-label">BUY-IN</span>
                            <span className="info-value">{SaldoFix(selectedTorneo.BuyIn)}</span>
                        </div>
                    )}

                    {selectedTorneo.Recompra > 0 && (
                        <div className="info-card">
                            <span className="info-icon">🔄</span>
                            <span className="info-label">RECOMPRA</span>
                            <span className="info-value">{SaldoFix(selectedTorneo.Recompra)}</span>
                        </div>
                    )}

                    {selectedTorneo.Addon > 0 && (
                        <div className="info-card">
                            <span className="info-icon">➕</span>
                            <span className="info-label">ADD-ON</span>
                            <span className="info-value">{SaldoFix(selectedTorneo.Addon)}</span>
                        </div>
                    )}

                    {selectedTorneo.Entrada > 0 && (
                        <div className="info-card highlight">
                            <span className="info-icon">🎟️</span>
                            <span className="info-label">ENTRADA</span>
                            <span className="info-value">{SaldoFix(selectedTorneo.Entrada)}</span>
                        </div>
                    )}

                    {selectedTorneo.Premios > 0 && (
                        <div className="info-card highlight">
                            <span className="info-icon">🏆</span>
                            <span className="info-label">PREMIOS</span>
                            <span className="info-value">{SaldoFix(selectedTorneo.Premios)}</span>
                        </div>
                    )}
                </div>

                {/* MAPA FULLWIDTH */}
                {getClubInfo(selectedTorneo.ID_Club)?.lat && getClubInfo(selectedTorneo.ID_Club)?.lon && (
                    <div className="torneo-mapa-section">
                        <h3>📍 UBICACIÓN EN MAPA</h3>
                        <div className="torneo-mapa-container">
                            <GooglMapsComp 
                                latitude={parseFloat(getClubInfo(selectedTorneo.ID_Club).lat)}
                                longitude={parseFloat(getClubInfo(selectedTorneo.ID_Club).lon)}
                            />
                        </div>
                    </div>
                )}

                {/* INFORMACIÓN DE CONTACTO */}
                {getClubInfo(selectedTorneo.ID_Club)?.Direccion && (
                    <div className="torneo-contacto">
                        <h3>📍 DIRECCIÓN</h3>
                        <p>{getClubInfo(selectedTorneo.ID_Club)?.Direccion}</p>
                        {getClubInfo(selectedTorneo.ID_Club)?.Telefono && (
                            <p><strong>Teléfono:</strong> {getClubInfo(selectedTorneo.ID_Club)?.Telefono}</p>
                        )}
                        {getClubInfo(selectedTorneo.ID_Club)?.lat && getClubInfo(selectedTorneo.ID_Club)?.lon && (
                            <a 
                                href={`https://maps.google.com/?q=${getClubInfo(selectedTorneo.ID_Club).lat},${getClubInfo(selectedTorneo.ID_Club).lon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-maps"
                            >
                                Abrir en Google Maps
                            </a>
                        )}
                    </div>
                )}

                {/* TORNEOS DEL MISMO CLUB */}
                {torneosDelClub.length > 1 && (
                    <div className="torneos-relacionados">
                        <h3>🎯 OTROS TORNEOS DEL CLUB</h3>
                        <div className="torneos-relacionados-grid">
                            {torneosDelClub.map((t, idx) => (
                                t.ID_Torneo !== selectedTorneo.ID_Torneo && (
                                    <div
                                        key={idx}
                                        className={`torneo-relacionado ${t.Destacado === 1 ? 'destacado' : ''}`}
                                        onClick={() => setSelectedTorneo(t)}
                                    >
                                        <h4>{t.Nombre}</h4>
                                        {t.Garantizado > 0 && (
                                            <p className="precio">💰 {SaldoFix(t.Garantizado)}</p>
                                        )}
                                        <p className="fecha">
                                            {t.FechaHora ? new Date(t.FechaHora).toLocaleDateString('es-ES') : 'N/A'}
                                        </p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* BOTONES DE ACCIÓN */}
                <div className="torneo-acciones">
                    <button 
                        className="btn-accion btn-club"
                        onClick={() => router.push(`/clubs/${selectedTorneo.ID_Club}`)}
                    >
                        Ver Club Completo →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TorneoIndividual
