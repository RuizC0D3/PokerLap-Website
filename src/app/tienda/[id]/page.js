// src/app/tienda/[id]/page.js
import TiendaVista from '../../../paginas/usuario/tienda'

export const revalidate = 3600;

export default function TiendaPage({ params }) {
  return <TiendaVista lang="es" setOpt={() => {}} clubIdFromUrl={params.id} />
}
