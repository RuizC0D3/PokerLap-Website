"use client";
import { useEffect, useState } from "react";
import Premiacion from "../vistas/premiacion";
import Fichas from "../vistas/fichas";
import Estructura from "../vistas/estructura";
import Reglas from "../vistas/reglas";
import { Opciones } from "../../modelos/opciones";
import RelojInteractivo from "./relojt";

const TorneoInteractivo = (props) => {
  const { torneoData = { Estructura: [], Inicio: new Date().getDate().toLocaleString() }, lang = 'es', elTorneo = 0 } = props
  const [inOpt, setInOpt] = useState({ tipo: 0, opt: 0 });
  const [lasHoras, setlasHoras] = useState({ target: false, NOW: false, opt: 0, losNiveles: [] });
  const makeRend = (more) => {
    if (more) {
      const NOW = new Date()
      let laHoraReal = new Date()
      let elMensaje = ''
      let losNiveles = lasHoras.losNiveles
      losNiveles.map((keyN, iN) => {
        let elTime = new Date(keyN.target)
        if (elTime < NOW) {
          if (losNiveles[iN + 1] && losNiveles[iN + 1].target && NOW < losNiveles[iN + 1].target) {
            laHoraReal = losNiveles[iN + 1].target
            elMensaje = ` ${keyN.tipo === 'Nivel' ? `Nivel ${keyN.n}` : `${keyN.tipo} Nivel ${keyN.n}`}  ${losNiveles[iN].bet} \n  Proximo  ${losNiveles[iN + 1].tipo}  ${losNiveles[iN + 1].bet}`
            console.log('esta es', keyN);
          } else {
            let newTime = new Date(keyN.target)
            newTime.setTime((newTime.getTime() + (keyN.m * 60 * 1000)))
            laHoraReal = newTime
            elMensaje = ` ${keyN.tipo === 'Nivel' ? `Nivel ${keyN.n}` : `${keyN.tipo} Nivel ${keyN.n}`}\n    Ultimo Nivel `
          }
        }
      });
      setlasHoras({ ...lasHoras, target: laHoraReal, NOW: NOW, losNiveles: losNiveles, mensaje: elMensaje })
    } else {
      if (torneoData.Hora && torneoData.Inicio) {
        const DATE_TARGET = new Date(torneoData.Inicio);
        let lastLevel = 0
        let losNiveles = [{ n: 0, target: DATE_TARGET, tipo: 'Registro' }]
        let startTime = DATE_TARGET
        let timeFinal = 0

        let intit = new Date(torneoData.Hora), NOW = new Date(), aDATE_TARGET = false
        if (intit) {
          let intitTime = NOW - intit.getTime()
          if (intitTime > 0) {
            aDATE_TARGET = DATE_TARGET
            aDATE_TARGET.setTime((DATE_TARGET.getTime() + intitTime))
          } else {
            intitTime = intitTime * -1
            aDATE_TARGET = DATE_TARGET
            aDATE_TARGET.setTime((DATE_TARGET.getTime() + intitTime))


          }
          for (let index = 0; index < torneoData.Estructura.length; index++) {
            timeFinal++
            const element = torneoData.Estructura[index];
            let newTime = new Date(startTime)
            let endTime = newTime.setTime((startTime.getTime() + (parseInt(torneoData.Estructura[index].m) * 60 * 1000)))
            if (element.n !== "-") {
              lastLevel = element.n
            }
            const bet = `${torneoData.Estructura[index].s} / ${torneoData.Estructura[index].a} Ante ${torneoData.Estructura[index].b}`
            losNiveles.push({ n: lastLevel, target: startTime, endTime: endTime, tipo: element.n !== "-" ? 'Nivel' : 'Descanso', bet: bet, m: parseInt(torneoData.Estructura[index].m) })
            startTime = newTime

          }
          let laHoraReal = DATE_TARGET
          let elMensaje = 'INICIO DEL TORNEO'
          losNiveles.map((keyN, iN) => {
            let elTime = new Date(keyN.target)
            if (elTime < NOW) {
              if (losNiveles[iN + 1] && losNiveles[iN + 1].target && NOW < losNiveles[iN + 1].target) {
                laHoraReal = losNiveles[iN].target
                elMensaje = ` ${keyN.tipo === 'Nivel' ? `Nivel ${keyN.n}` : `${keyN.tipo} Nivel ${keyN.n}`} ${losNiveles[iN].bet} \n  Proximo ${losNiveles[iN + 1].tipo} ${losNiveles[iN + 1].bet} `
                console.log('esta es', keyN);
              } else {
                let newTime = new Date(keyN.target)
                newTime.setTime((newTime.getTime() + (keyN.m * 60 * 1000)))
                laHoraReal = newTime
                elMensaje = ` ${keyN.tipo === 'Nivel' ? `Nivel ${keyN.n}` : `${keyN.tipo} Nivel ${keyN.n}`}  ${keyN.bet}  \n Ultimo Nivel `
              }
            }
          })
          console.log(losNiveles, intit, 'intit', NOW, 'NOW', DATE_TARGET, 'DATE_TARGET', intitTime > 0 ? 'adelantado' : 'atrasado', intitTime);
          setlasHoras({ ...lasHoras, target: laHoraReal, NOW: NOW, losNiveles: losNiveles, mensaje: elMensaje })
        }
      }
    }

  }
  useEffect(() => {
    makeRend()
  }, [torneoData.Hora, torneoData.Inicio])
  return (
    <>
      <div className="menu-interactivo">

        <RelojInteractivo makeRend={makeRend} lang={lang} torneoData={torneoData} fecha={torneoData.Inicio} horas={lasHoras} />

        <div className="opciones">
          {Opciones.map((key, i) => {
            return (
              <>
                <div
                  className={inOpt.opt === i ? 'opcions opcion' : "opcion"}
                  key={`opcion${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setInOpt({ tipo: 0, opt: i });
                  }}
                >
                  {key.svg}
                  <span className="mtfichas">
                    {key.string}
                  </span>
                </div>
              </>
            );
          })}
        </div>
        <div className="vistas wtdPxDecena-50 size-100 ">
          {inOpt.tipo === 0 && (
            <>
              {inOpt.opt === 0 && (
                <>
                  <Premiacion lang={lang} elTorneo={elTorneo} torneoData={torneoData} />
                </>
              )}
              {inOpt.opt === 1 && (
                <>
                  <Fichas lang={lang} elTorneo={elTorneo} torneoData={torneoData} />
                </>
              )}
              {inOpt.opt === 2 && (
                <>
                  <Estructura lang={lang} elTorneo={elTorneo} torneoData={torneoData} />
                </>
              )}
              {inOpt.opt === 3 && (
                <>
                  <Reglas lang={lang} elTorneo={elTorneo} torneoData={torneoData} />
                </>
              )}
            </>
          )}
        </div>
        <div className="confirmacion">
          <div className="reservar"></div>
          <div className="aceptar"></div>
        </div>
      </div>
    </>
  );
};
export default TorneoInteractivo;
