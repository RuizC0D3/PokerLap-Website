"use client";

import { useState } from "react";
import { PremiacionArray } from "../../modelos/opciones";

const Premiacion = (props) => {
  const { torneoData = { Estructura: [] }, elTorneo = 0 } = props
  const reduceFichas = (fichas) => {
    let lasFichas = parseFloat(fichas)
    if (lasFichas >= 1000000) {
      lasFichas = parseFloat((lasFichas / 1000000).toFixed(2));
      return lasFichas + 'M';
    } else if (lasFichas >= 1000) {
      lasFichas = parseFloat((lasFichas / 1000).toFixed(2))
      return lasFichas + 'K';
    } else {
      return lasFichas;
    }

  }
  const [inOpt, setInOpt] = useState({ tipo: 0, opt: 0 });
  return (
    <>
      <div className="premiacion">
        <div className="seccion-uno">
          {PremiacionArray.map((key, i) => {
            return (
              <>
                <div className="dato">
                  <div className="texto" key={`dato${i}`}>
                    {key.string}
                  </div>
                  <div className="valor" key={`dato${i}`}>
                    {torneoData[key.key] || torneoData[key.key] === 0 ? torneoData[key.key] === 0 ? 0 : torneoData[key.key] : key.key}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="seccion-dos">

          <div className="titulo-seccion">
            <h5>Premiación</h5>
          </div>
          <div className="listaP">
            {
              torneoData.Premios && torneoData.Premios && torneoData.Premios && torneoData.Premios.map((jey, i) => {
                return (
                  <>
                    {jey.p && jey.p > 0 ? <div key={`asas${i}`} className="posicion">
                      <div><p className="pf">Posición {jey.p} </p></div>
                      <div><p >{` `}{reduceFichas(jey.v)} </p></div>
                    </div> : <></>}
                  </>
                )
              })
            }
          </div>

        </div>
      </div>
    </>
  );
};
export default Premiacion;
