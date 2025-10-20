// src/app/clubs/[id]/page.js
import '../../../../estilos/styles.scss'
import PageHead from '../../../components/body/pageHead'
import { ClubDetail } from '../../../paginas/clubs/clubVista'

export const revalidate = 3600;

async function getClubData(clubId) {
  try {
    const clubRes = await fetch("https://api.pkti.me/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: "Club_Listar", p: ["CO"] }),
      cache: 'no-store' // o 'force-cache' con revalidate
    })
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
        <a href="/clubs">← Volver</a>
      </div>
    )
  }

  return (
    <>
      {/* 1. HEADER MULTIIDIOMA */}
      <PageHead lang="es" page="Clubs" subPage={club.Nombre} />

      {/* 2. BOTÓN VOLVER */}
      <div className="back-nav-wrapper">
        <div className="back-nav">
          <a href="/clubs">← Volver a Clubs</a>
        </div>
      </div>

      {/* 3. DETALLE DEL CLUB ABAJO DEL HEADER */}
      <div className="club-detail-wrapper">
        <ClubDetail club={club} torneos={torneos} />
      </div>
    </>
  )
}

// Metadata dinámica
export async function generateMetadata({ params }) {
  const { club } = await getClubData(params.id)
  if (!club) return { title: 'Club no encontrado' }
  return {
    title: `${club.Nombre} - PokerLAP`,
    description: club.Direccion || 'Club de poker',
    openGraph: {
      title: club.Nombre,
      description: club.Direccion,
      images: [`https://img.pkti.me/club/${club.logo || club.Logo}`]
    }
  }
}

