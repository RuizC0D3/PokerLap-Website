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

  // Helper para formatear fecha
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
            <p className="direccion">
              <span className="icon">📍</span>
              {club.Direccion}
            </p>
          )}
          
          <div className="club-actions">
            {mapHref && (
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="btn-action btn-mapa">
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
            <button onClick={onShare} className="btn-action btn-compartir">
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
              // Mapeo flexible de campos (ajustado a tu API)
              const nombre = t?.Nombre || t?.nombre || t?.Titulo || 'Torneo sin nombre'
              const fecha = t?.Fecha || t?.fecha || t?.FechaInicio
              const hora = t?.Hora || t?.hora || t?.HoraInicio
              const garantia = t?.Garantia || t?.garantia || t?.PremioGarantizado
              const buyin = t?.Buyin || t?.buyin || t?.BuyIn || t?.Entrada
              const recompra = t?.Recompra || t?.recompra || t?.Rebuys
              const stack = t?.Stack || t?.stack || t?.StackInicial
              const niveles = t?.Niveles || t?.niveles || t?.DuracionNiveles
              const descripcion = t?.Descripcion || t?.descripcion || t?.Detalles
              const imagen = t?.Imagen || t?.imagen || t?.Foto
              const estado = t?.Estado || t?.estado || 'Activo'
              
              return (
                <div key={i} className="torneo-card-detailed">
                  {/* Header del torneo */}
                  <div className="torneo-header">
                    <h3>{nombre}</h3>
                    {estado && (
                      <span className={`torneo-status ${String(estado).toLowerCase()}`}>
                        {estado}
                      </span>
                    )}
                  </div>

                  <div className="torneo-content">
                    {/* Imagen del torneo */}
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
                    
                    {/* Grid de información detallada */}
                    <div className="details-grid">
                      {fecha && (
                        <div className="detail-item">
                          <span className="icon">📅</span>
                          <div>
                            <span className="label">Fecha</span>
                            <span className="value">{formatFecha(fecha) || fecha}</span>
                          </div>
                        </div>
                      )}
                      
                      {hora && (
                        <div className="detail-item">
                          <span className="icon">🕐</span>
                          <div>
                            <span className="label">Hora de inicio</span>
                            <span className="value">{hora}</span>
                          </div>
                        </div>
                      )}
                      
                      {garantia && (
                        <div className="detail-item highlight">
                          <span className="icon">💰</span>
                          <div>
                            <span className="label">Premio garantizado</span>
                            <span className="value">{garantia}</span>
                          </div>
                        </div>
                      )}
                      
                      {buyin && (
                        <div className="detail-item">
                          <span className="icon">💵</span>
                          <div>
                            <span className="label">Buy-in</span>
                            <span className="value">{buyin}</span>
                          </div>
                        </div>
                      )}
                      
                      {recompra && (
                        <div className="detail-item">
                          <span className="icon">🔄</span>
                          <div>
                            <span className="label">Recompra</span>
                            <span className="value">{recompra}</span>
                          </div>
                        </div>
                      )}
                      
                      {stack && (
                        <div className="detail-item">
                          <span className="icon">🎰</span>
                          <div>
                            <span className="label">Stack inicial</span>
                            <span className="value">{stack}</span>
                          </div>
                        </div>
                      )}
                      
                      {niveles && (
                        <div className="detail-item">
                          <span className="icon">⏱️</span>
                          <div>
                            <span className="label">Duración niveles</span>
                            <span className="value">{niveles} min</span>
                          </div>
                        </div>
                      )}

                      {/* Mostrar TODOS los demás campos del torneo automáticamente */}
                      {Object.keys(t).map(key => {
                        // Saltar campos ya mostrados o internos
                        const skipFields = [
                          'Nombre', 'nombre', 'Titulo',
                          'Fecha', 'fecha', 'FechaInicio',
                          'Hora', 'hora', 'HoraInicio',
                          'Garantia', 'garantia', 'PremioGarantizado',
                          'Buyin', 'buyin', 'BuyIn', 'Entrada',
                          'Recompra', 'recompra', 'Rebuys',
                          'Stack', 'stack', 'StackInicial',
                          'Niveles', 'niveles', 'DuracionNiveles',
                          'Descripcion', 'descripcion', 'Detalles',
                          'Imagen', 'imagen', 'Foto',
                          'Estado', 'estado',
                          'ID_Torneo', 'ID_Club', 'id', '_id'
                        ]
                        
                        if (skipFields.includes(key) || !t[key]) return null
                        
                        return (
                          <div key={key} className="detail-item">
                            <span className="icon">📋</span>
                            <div>
                              <span className="label">{key.replace(/_/g, ' ')}</span>
                              <span className="value">{String(t[key])}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Descripción */}
                    {descripcion && (
                      <div className="torneo-descripcion">
                        <h4>📝 Descripción</h4>
                        <p>{descripcion}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
