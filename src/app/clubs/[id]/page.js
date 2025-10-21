// src/app/clubs/[id]/page.js
import '../../../../estilos/styles.scss'
import PageHead from '../../../components/body/pageHead'
import { ClubDetail } from '../../../paginas/clubs/clubVista'

export const revalidate = 3600;

async function getClubData(clubId) {
  try {
    if (!clubId || isNaN(Number(clubId))) {
      return { club: null, torneos: [] }
    }

    const clubRes = await fetch("https://api.pkti.me/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: "Club_Listar", p: ["CO"] }),
      cache: 'force-cache',
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000)
    })
    
    if (!clubRes.ok) throw new Error(`HTTP error! status: ${clubRes.status}`)
    
    const clubs = await clubRes.json()
    const club = clubs.find(c => String(c.ID_Club) === String(clubId))

    const torneosRes = await fetch("https://api.pkti.me/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: "Torneo_Listar", p: ["CO", 1000] })
    })
    const torneos = await torneosRes.json()

    return { club, torneos }
  } catch (error) {
    console.error('[getClubData] Error:', error)
    return { club: null, torneos: [] }
  }
}

export default async function ClubPage({ params }) {
  const { club, torneos } = await getClubData(params.id)

  if (!club) {
    return (
      <div className="club-page-error">
        <h2>Club no encontrado</h2>
        <a href="/clubs">← Volver a Clubs</a>
      </div>
    )
  }

  return (
    <>
      <div style={{ marginTop: 80 }} /> {/* ✅ Espacio para navbar */}
      <PageHead lang="es" page="Clubs" subPage={club.Nombre} />

      <div className="back-nav-wrapper">
        <div className="back-nav">
          <a href="/clubs">← Volver a Clubs</a>
        </div>
      </div>

      <div className="club-detail-wrapper">
        <ClubDetail club={club} torneos={torneos} />
      </div>
    </>
  )
}

export async function generateMetadata({ params }) {
  const { club } = await getClubData(params.id)
  
  if (!club) {
    return {
      title: 'Club no encontrado | PokerLAP',
      robots: 'noindex'
    }
  }
  
  const logoUrl = club.logo || club.Logo 
    ? `https://img.pkti.me/club/${club.logo || club.Logo}`
    : 'https://www.pokerlap.com/img/ficha512.jpg'
  
  return {
    title: `${club.Nombre} - Club de Poker | PokerLAP`,
    description: `${club.Nombre} en ${club.Direccion || 'Colombia'}. Torneos activos, información de contacto y ubicación. Encuentra los mejores clubes de poker en PokerLAP.`,
    keywords: `poker, ${club.Nombre}, club de poker, torneos, ${club.Ciudad || 'Colombia'}`,
    openGraph: {
      type: 'website',
      siteName: 'PokerLAP',
      title: `${club.Nombre} | PokerLAP`,
      description: `Información completa de ${club.Nombre}: ubicación, torneos y contacto`,
      images: [{ url: logoUrl, width: 512, height: 512, alt: club.Nombre }],
      locale: 'es_CO'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${club.Nombre} | PokerLAP`,
      description: club.Direccion || 'Club de poker en Colombia',
      images: [logoUrl]
    }
  }
}
