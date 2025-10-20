'use client'

import { ObjVistasIdiomas } from "../../modelos/languages"
import { useRouter } from "next/navigation"

const PageHead = ({ lang = 'es', page = 'Inicio', subPage = '' }) => {
  const router = useRouter()
  const textos = ObjVistasIdiomas[lang] || {}
  const titulo = subPage || textos[page] || page

  return (
    <div className="page-head-container">
      <h5 className="mb-10 mt-10">{titulo}</h5>
      <div className="flex-row">
        <span
          className="page-back"
          onClick={() => router.push('/')}
        >
          {textos.Inicio}
        </span>
        {' > '}
        <span
          className="page-back"
          onClick={() => router.push(`/${page.toLowerCase()}`)}
        >
          {textos[page]}
        </span>
        {subPage && (
          <>
            {' > '}
            <span className="page-item">{subPage}</span>
          </>
        )}
      </div>
    </div>
  )
}

<style jsx>{`
  .page-head-container .flex-row span {
    transition: color 0.2s;
  }
  .page-head-container .flex-row .page-back:hover {
    color: #e74c3c;
    text-decoration: underline;
  }
`}</style>
