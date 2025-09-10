"use client";

const Reglas = (props) => {
  const { lang = 'es', torneoData = { Estructura: [] }, elTorneo = 0 } = props

  return (
    <>
      <div className="reglas">
        <h5>   {torneoData.Descripcion ? <>{torneoData.Descripcion}</> : <>Reglas</>}</h5>
        {/*  <button className="listav hover" onClick={(e) => { e.preventDefault(); window.open(`../li.html?ID_Torneo=${elTorneo}`) }}>
          {lang === 'es' ? 'Ver Lista Jugadores' : 'Players List'}
        </button> */}
      </div>
    </>
  );
};
export default Reglas;