// src/paginas/clubs/clubVista.jsx
'use client'

import React, { useMemo } from 'react'

/* -----------------------------
   Helpers para imagen de club
----------------------------- */
function buildClubImg(club) {
  // el back puede mandar: Logo | Imagen | logo | foto | img | image | url absoluta | hash | filename.jpg
  const raw =
    club?.Logo ??
    club?.Imagen ??
    club?.logo ??
    club?.foto ??
    club?.img ??
    club?.image ??
    '';

  if (!raw) return '/img/no-image.png';

  // Si ya es URL absoluta, úsala tal cual
  const str = String(raw).trim();
  if (/^https?:\/\//i.test(str)) return str;

  // Limpia posibles slashes al inicio
  const clean = str.replace(/^\/+/, '');

  // Si ya parece un filename con extensión o trae path, úsalo debajo del CDN
  const hasExt = /\.[a-z0-9]{3,4}$/i.test(clean); // .jpg .png .jpeg etc
  const hasSlash = clean.includes('/');

  if (hasSlash) {
    // Si viene algo tipo "club/6806.jpg" o "media/club.jpg"
    return `https://img.pkti.me/${clean}`;
  }

  if (hasExt) {
    // Si viene "6806.jpg"
    return `https://img.pkti.me/club/${clean}`;
  }

  // Si viene sólo el hash "6806...", añadimos .jpg
  return `https://img.pkti.me/club/${clean}.jpg`;
}


function hasTorneosForClub(torneos, idClub) {
  if (!Array.isArray(torneos) || !idClub) return false
  return torneos.some(t => String(t?.ID_Club) === String(idClub))
}

/* ============================
 * Card (grid) - export default
 * ============================ */
export default function ClubVista({ club = {}, torneos = [] }) {
  const img = buildClubImg(club)
  const href = club?.ID_Club ? `/clubs/${club.ID_Club}` : undefined
  const tieneTorneos = hasTorneosForClub(torneos, club?.ID_Club)

  return (
    <a href={href} className="club-card-modern">
      <div className="club-card-image-wrapper">
        <img
          src={img}
          alt={club?.Nombre || 'Club'}
          loading="lazy"
          onError={(ev) => { ev.currentTarget.src = '/img/no-image.png' }}
          className="club-card-image"
        />
        {tieneTorneos && (
          <span className="club-badge-torneos">🏆 Torneos</span>
        )}
      </div>
      
      <div className="club-card-content">
        <h3 className="club-card-title">{club?.Nombre || 'Club sin nombre'}</h3>
        <p className="club-card-direccion">{club?.Direccion || 'Dirección no disponible'}</p>
        <span className="club-card-btn">Ver detalles →</span>
      </div>
    </a>
  )
}


/* ============================
 * Detalle (header + torneos)
 *    export nombrado: ClubDetail
 * ============================ */
// src/paginas/clubs/clubVista.jsx
// Helper para formatear moneda colombiana
const formatCurrency = (value) => {
  if (!value) return null
  const numericValue = parseInt(value.toString().replace(/\D/g, ''), 10)
  if (isNaN(numericValue)) return value
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue)
}

// Helper para formatear fechas
const formatFecha = (fecha) => {
  if (!fecha) return null
  try {
    return new Date(fecha).toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return fecha
  }
}

export function ClubDetail({ club = {}, torneos = [] }) {
  const img = buildClubImg(club)
  const torneosActivos = useMemo(() => {
    if (!Array.isArray(torneos)) return []
    return torneos.filter(t => String(t?.ID_Club) === String(club?.ID_Club))
  }, [torneos, club?.ID_Club])
  
  const whats = club?.WhatsApp || club?.Telefono || ''
  const mapHref = club?.Direccion 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.Direccion)}`
    : null
    
  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ 
          title: club?.Nombre, 
          text: `${club?.Nombre} - ${club?.Direccion}`, 
          url: window.location.href 
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        alert('¡Enlace copiado al portapapeles!')
      }
    } catch (e) {
      alert('Copia este enlace: ' + window.location.href)
    }
  }

  return (
    <div className="club-detail-container">
      {/* Header/Info principal del club */}
      <div className="club-detail-header">
        <div className="club-image">
          <img 
            src={img} 
            alt={club?.Nombre || 'Club'} 
            onError={(ev) => {ev.currentTarget.src='/img/no-image.png'}}
          />
        </div>
        <div className="club-info">
          <h1>{club?.Nombre || 'Club'}</h1>
          {club?.Direccion && (
            <div className="direccion">
              <span className="icon">📍</span>
              <span>{club.Direccion}</span>
            </div>
          )}
          <div className="club-actions">
            {mapHref && (
              <a 
                href={mapHref} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-action btn-mapa"
              >
                📍 Ver en mapa
              </a>
            )}
            {whats && (
              <a 
                href={`https://wa.me/${whats.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-action btn-whatsapp"
              >
                💬 WhatsApp
              </a>
            )}
            <button 
              onClick={onShare} 
              className="btn-action btn-compartir"
            >
              🔗 Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Sección de torneos activos */}
      <div className="torneos-section">
        <h2>🏆 Torneos activos</h2>
        {torneosActivos.length === 0 ? (
          <div className="no-torneos">
            <p>No hay torneos activos en este momento.</p>
            <p className="subtexto">¡Mantente atento a próximos eventos!</p>
          </div>
        ) : (
          <div className="torneos-list">
            {torneosActivos.map((t, i) => {
              const nombre = t?.Nombre || t?.nombre || t?.Titulo || 'Torneo sin nombre'
              const fecha = t?.Fecha || t?.fecha || t?.FechaInicio
              const hora = t?.Hora || t?.hora || t?.HoraInicio
              const garantia = t?.Garantia || t?.garantia || t?.PremioGarantizado
              const buyin = t?.Buyin || t?.buyin || t?.BuyIn || t?.Entrada
              const recompra = t?.Recompra || t?.recompra || t?.Rebuys
              const addon = t?.Addon || t?.addon || t?.AddOn
              const stack = t?.Stack || t?.stack || t?.StackInicial
              const niveles = t?.Niveles || t?.niveles || t?.DuracionNiveles
              const descripcion = t?.Descripcion || t?.descripcion || t?.Detalles
              const imagen = t?.Imagen || t?.imagen || t?.Foto
              const estado = t?.Estado || t?.estado || 'Activo'
              const camposOcultos = [
                'Nombre', 'nombre', 'Titulo',
                'Fecha', 'fecha', 'FechaInicio',
                'Hora', 'hora', 'HoraInicio',
                'Garantia', 'garantia', 'PremioGarantizado',
                'Buyin', 'buyin', 'BuyIn', 'Entrada',
                'Recompra', 'recompra', 'Rebuys',
                'Addon', 'addon', 'AddOn',
                'Stack', 'stack', 'StackInicial',
                'Niveles', 'niveles', 'DuracionNiveles',
                'Descripcion', 'descripcion', 'Detalles',
                'Imagen', 'imagen', 'Foto',
                'Estado', 'estado',
                'ID_Torneo', 'ID_Club', 'id', '_id',
                'Logo', 'logo', 'LogoCasino New York',
                'ClubCasino New York', 'Inicio', 'ID PaisCO',
                'FichasAdd30000', 'FichasRebuy60000', 'Fichastoin10000',
                'Reservas61', 'Jugadores66', 'MonedaCOP'
              ]
              return (
                <div key={i} className="torneo-card-detailed">
                  <div className="torneo-header">
                    <h3>{nombre}</h3>
                    {estado && (
                      <span className="torneo-status activo">
                        {estado}
                      </span>
                    )}
                  </div>
                  {imagen && (
                    <div className="torneo-image">
                      <img 
                        src={imagen.startsWith('http') ? imagen : `/multimedia/torneos/${imagen}`}
                        alt={nombre}
                        loading="lazy"
                        onError={(ev) => {ev.currentTarget.style.display='none'}}
                      />
                    </div>
                  )}
                  <div className="torneo-content">
                    <div className="details-grid">
                      {fecha && (
                        <div className="detail-item">
                          <span className="icon">📅</span>
                          <div className="detail-content">
                            <span className="label">Fecha</span>
                            <span className="value">{formatFecha(fecha) || fecha}</span>
                          </div>
                        </div>
                      )}
                      {hora && (
                        <div className="detail-item">
                          <span className="icon">🕐</span>
                          <div className="detail-content">
                            <span className="label">Hora de inicio</span>
                            <span className="value">{hora}</span>
                          </div>
                        </div>
                      )}
                      {(garantia || garantia === 0) && (
                        <div className="detail-item highlight">
                          <span className="icon">💰</span>
                          <div className="detail-content">
                            <span className="label">Premio garantizado</span>
                            <span className="value">
                              {garantia && garantia !== '0' && garantia !== 0 
                                ? (formatCurrency(garantia) || garantia)
                                : <span className="no-info">Por confirmar</span>
                              }
                            </span>
                          </div>
                        </div>
                      )}
                      {(buyin || buyin === 0) && (
                        <div className="detail-item highlight">
                          <span className="icon">💵</span>
                          <div className="detail-content">
                            <span className="label">Buy-in</span>
                            <span className="value">
                              {buyin && buyin !== '0' && buyin !== 0
                                ? (formatCurrency(buyin) || buyin)
                                : <span className="no-info">Entrada libre</span>
                              }
                            </span>
                          </div>
                        </div>
                      )}
                      {(recompra || recompra === 0) && (
                        <div className="detail-item">
                          <span className="icon">🔄</span>
                          <div className="detail-content">
                            <span className="label">Recompra</span>
                            <span className="value">
                              {recompra && recompra !== '0' && recompra !== 0
                                ? (formatCurrency(recompra) || recompra)
                                : <span className="no-info">No disponible</span>
                              }
                            </span>
                          </div>
                        </div>
                      )}
                      {(addon || addon === 0) && (
                        <div className="detail-item">
                          <span className="icon">➕</span>
                          <div className="detail-content">
                            <span className="label">Add-on</span>
                            <span className="value">
                              {addon && addon !== '0' && addon !== 0
                                ? (formatCurrency(addon) || addon)
                                : <span className="no-info">No disponible</span>
                              }
                            </span>
                          </div>
                        </div>
                      )}
                      {(stack || stack === 0) && (
                        <div className="detail-item">
                          <span className="icon">🎰</span>
                          <div className="detail-content">
                            <span className="label">Stack inicial</span>
                            <span className="value">
                              {stack && stack !== '0' && stack !== 0
                                ? (formatCurrency(stack) || stack)
                                : <span className="no-info">Por confirmar</span>
                              }
                            </span>
                          </div>
                        </div>
                      )}
                      {niveles && (
                        <div className="detail-item">
                          <span className="icon">⏱️</span>
                          <div className="detail-content">
                            <span className="label">Duración niveles</span>
                            <span className="value">{niveles} min</span>
                          </div>
                        </div>
                      )}
                      {Object.keys(t).map(key => {
                        if (camposOcultos.includes(key) || !t[key]) return null
                        const keyLower = key.toLowerCase()
                        const camposMonetarios = [
                          'entradaf', 'entrada_f', 'entrada', 
                          'fichasini', 'fichas_ini', 'fichasinicial', 'fichas_inicial',
                          'fichasrein', 'fichas_rein', 'fichasreintegro', 'fichas_reintegro',
                          'fichasadd', 'fichas_add', 
                          'rebuy', 're_buy', 'recompra',
                          'garantizado', 'garantia', 'premio',
                          'addon', 'add_on'
                        ]
                        const esMonetario = camposMonetarios.some(campo => 
                          keyLower.includes(campo.replace('_', ''))
                        )
                        const valor = String(t[key]).trim()
                        if ((valor === '0' || valor === '') && esMonetario) return null
                        if (valor === '0' || valor === '') return null
                        const labelMap = {
                          'entradaf': 'Entrada final',
                          'entrada_f': 'Entrada final',
                          'fichasini': 'Fichas iniciales',
                          'fichas_ini': 'Fichas iniciales',
                          'fichasinicial': 'Fichas iniciales',
                          'fichasrein': 'Fichas de reintegro',
                          'fichas_rein': 'Fichas de reintegro',
                          'fichasreintegro': 'Fichas de reintegro',
                          'fichasadd': 'Fichas add-on',
                          'fichas_add': 'Fichas add-on',
                          'rebuy': 'Recompra',
                          're_buy': 'Recompra',
                          'garantizado': 'Premio garantizado'
                        }
                        const label = labelMap[keyLower] || key.replace(/_/g, ' ')
                        const valorFormateado = esMonetario ? (formatCurrency(valor) || valor) : valor
                        return (
                          <div key={key} className="detail-item">
                            <span className="icon">📋</span>
                            <div className="detail-content">
                              <span className="label">{label}</span>
                              <span className="value">{valorFormateado}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Descripción */}
                  {descripcion && (
                    <div className="torneo-descripcion">
                      <h4>📝 Descripción</h4>
                      <p>{descripcion}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}