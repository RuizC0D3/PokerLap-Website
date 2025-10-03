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

  // Usamos <a> real (no onClick) para que Next haga navegación correcta a /clubs/[club]
  return (
    <a href={href} className="cv-card" aria-label={club?.Nombre || 'Club'}>
      <div className="cv-thumb">
        <img
          src={img}
          alt={club?.Nombre || 'Club'}
          loading="lazy"
          onError={(ev) => { ev.currentTarget.src = '/img/no-image.png' }}
        />
        {tieneTorneos && <span className="cv-badge">Torneos</span>}
      </div>

      <div className="cv-body">
        <h3 className="cv-title">{club?.Nombre || 'Club sin nombre'}</h3>
        <p className="cv-meta">{club?.Direccion || 'Dirección no disponible'}</p>
        <div className="cv-actions">
          <span className="cv-btn">Ver</span>
        </div>
      </div>

      <style jsx>{`
        .cv-card{
          display:grid; grid-template-rows:auto 1fr; gap:12px;
          width:100%; background:#fff; color:#111; text-decoration:none;
          border:1px solid rgba(0,0,0,.08); border-radius:18px;
          box-shadow:0 10px 26px rgba(0,0,0,.10);
          overflow:hidden; transition:.16s transform,.16s box-shadow,.16s border-color;
        }
        .cv-card:hover{
          transform:translateY(-3px);
          box-shadow:0 16px 36px rgba(0,0,0,.16);
          border-color:rgba(0,0,0,.14);
        }

        .cv-thumb{ position:relative; aspect-ratio: 4 / 3; background:#f5f7f9; overflow:hidden; }
        .cv-thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
        .cv-badge{
          position:absolute; left:12px; bottom:12px; z-index:2;
          background:#17a34a; color:#fff; font-weight:800; font-size:12px;
          padding:5px 12px; border-radius:999px; box-shadow:0 8px 24px rgba(0,0,0,.20);
        }

        .cv-body{ padding:14px 16px 16px; display:grid; gap:8px; }
        .cv-title{ margin:0; font-size:18px; font-weight:900; letter-spacing:.2px; line-height:1.2; }
        .cv-meta{ margin:0; font-size:13px; color:#444; opacity:.85; }
        .cv-actions{ margin-top:4px; }
        .cv-btn{
          height:40px; padding:0 16px; display:inline-flex; align-items:center; justify-content:center;
          background:#111; color:#fff; border:1px solid #111; border-radius:12px; font-weight:800;
          box-shadow:0 10px 26px rgba(0,0,0,.14);
        }
      `}</style>
    </a>
  )
}

/* ============================
 * Detalle (header + torneos)
 *    export nombrado: ClubDetail
 * ============================ */
export function ClubDetail({ club = {}, torneos = [] }) {
  const img = buildClubImg(club)

  const torneosActivos = useMemo(() => {
    if (!Array.isArray(torneos)) return []
    return torneos.filter(t => String(t?.ID_Club) === String(club?.ID_Club))
  }, [torneos, club?.ID_Club])

  const whats = club?.WhatsApp || club?.Telefono || ''
  const mapHref = club?.Direccion ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.Direccion)}` : null
  const shareText = `${club?.Nombre || 'Club'} - ${club?.Direccion || ''}`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const onShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: club?.Nombre, text: shareText, url: shareUrl })
      else alert('Copia el link y compártelo:\n' + shareUrl)
    } catch {}
  }

  return (
    <section className="cd-wrap">
      <div className="cd-hero">
        <div className="cd-img">
          <img src={img} alt={club?.Nombre || 'Club'} onError={(ev)=>{ev.currentTarget.src='/img/no-image.png'}} />
        </div>
        <div className="cd-info">
          <h1>{club?.Nombre || 'Club'}</h1>
          {club?.Direccion && <p className="cd-dir">{club.Direccion}</p>}
          <div className="cd-actions">
            {mapHref && <a className="cd-icon" href={mapHref} target="_blank" rel="noreferrer" title="Ver mapa">📍</a>}
            <button className="cd-icon" onClick={onShare} title="Compartir">🔗</button>
            {whats && <a className="cd-icon" href={`https://wa.me/${whats}`} target="_blank" rel="noreferrer" title="WhatsApp">💬</a>}
          </div>
        </div>
      </div>

      <h3 className="cd-sub">Torneos activos</h3>
      {torneosActivos.length === 0 ? (
        <p className="cd-empty">No hay torneos activos en este momento.</p>
      ) : (
        <div className="cd-grid">
          {torneosActivos.map((t, i) => (
            <article key={i} className="t-card">
              <header className="t-head">
                <h4>{t?.Nombre || t?.Title || 'Torneo'}</h4>
                {t?.Fecha && <span className="t-date">{t.Fecha}</span>}
              </header>
              {t?.Imagen && (
                <div className="t-img">
                  <img
                    src={t.Imagen.startsWith('http') ? t.Imagen : `/multimedia/torneos/${t.Imagen}`}
                    alt={t?.Nombre || 'Torneo'}
                    loading="lazy"
                    onError={(ev)=>{ev.currentTarget.style.display='none'}}
                  />
                </div>
              )}
              <ul className="t-meta">
                {t?.Garantia ? <li><b>Garantía:</b> {t.Garantia}</li> : null}
                {t?.Buyin ? <li><b>Buy-in:</b> {t.Buyin}</li> : null}
                {t?.Recompra ? <li><b>Recompra:</b> {t.Recompra}</li> : null}
              </ul>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        .cd-wrap{ display:grid; gap:20px; }
        .cd-hero{
          display:grid; gap:16px; grid-template-columns: 270px 1fr;
          background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:18px; padding:16px;
          box-shadow:0 10px 26px rgba(0,0,0,.10);
        }
        .cd-img{ aspect-ratio:1/1; border-radius:14px; overflow:hidden; background:#f4f6f7; }
        .cd-img img{ width:100%; height:100%; object-fit:cover; display:block; }
        .cd-info h1{ margin:.2rem 0 .35rem; font-size:28px; font-weight:900; }
        .cd-dir{ margin:0 0 .7rem; opacity:.85; }
        .cd-actions{ display:flex; gap:10px; }
        .cd-icon{
          width:42px; height:42px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(0,0,0,.15); border-radius:12px; background:#fff; cursor:pointer;
          transition:.14s transform,.14s box-shadow,.14s background;
          box-shadow:0 10px 26px rgba(0,0,0,.10);
        }
        .cd-icon:hover{ transform:translateY(-1px); box-shadow:0 14px 34px rgba(0,0,0,.12); background:#f7f7f7; }

        .cd-sub{ margin:6px 0 0; font-size:18px; font-weight:900; }
        .cd-empty{ margin:0; opacity:.75; }

        .cd-grid{
          display:grid; gap:16px;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .t-card{
          background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:14px; padding:12px;
          box-shadow:0 8px 22px rgba(0,0,0,.06);
          display:grid; gap:10px;
        }
        .t-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .t-head h4{ margin:0; font-size:16px; font-weight:800; }
        .t-date{ font-size:12px; opacity:.7; }
        .t-img{ border-radius:10px; overflow:hidden; background:#f4f6f7; aspect-ratio: 16/10; }
        .t-img img{ width:100%; height:100%; object-fit:cover; display:block; }
        .t-meta{ margin:0; padding-left:16px; display:grid; gap:4px; font-size:13px; }
      `}</style>

      <style jsx>{`
        @media (max-width: 840px){
          .cd-hero{ grid-template-columns: 1fr; }
          .cd-img{ aspect-ratio: 16/10; }
        }
      `}</style>
    </section>
  )
}
