"use client";
import { useEffect, useState } from "react";
let elint = false
let intit = false
let DATE_TARGET = new Date()
const RelojInteractivo = (props) => {
    const { makeRend = console.log, lang = 'es', horas = {
        target: new Date(),
        NOW: new Date(),
        opt: false,
        mensaje: ''
    }, torneoData = { Estructura: [], Inicio: new Date().getDate().toLocaleString() }
    } = props
    const [laHora, setlaHora] = useState({ d: -1, h: -1, m: -1, s: -1 });
    const MILLISECONDS_OF_A_SECOND = 1000;
    const FechatCount = () => {
        const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
        const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
        const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24
        const NOWA = new Date()

        //===
        // FUNCTIONS
        //===

        /**
         * Method that updates the countdown and the sample
         */
        function updateCountdown() {


            const NOW = new Date()

            const DURATION = DATE_TARGET - NOW;
            const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
            const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
            const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
            const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);
            // Thanks Pablo Monteserín (https://pablomonteserin.com/cuenta-regresiva/)

            // Render

            setlaHora({ ...laHora, d: REMAINING_DAYS, h: REMAINING_HOURS, m: REMAINING_MINUTES, s: REMAINING_SECONDS })
            if (DATE_TARGET <= NOW) {
                makeRend(true)
            }
        }

        //===
        // INIT
        //===
        updateCountdown();
        // Refresh every second

    }
    useEffect(() => {
        if (elint) {
            clearInterval(elint)
            elint = false
            elint = setInterval(FechatCount, MILLISECONDS_OF_A_SECOND);
        } else {
            elint = setInterval(FechatCount, MILLISECONDS_OF_A_SECOND);

        }

    }, [horas])
    useEffect(() => {
        DATE_TARGET = horas.target

    }, [horas])

    return (
        <>
            <div className="tiempo">
                {laHora.s >= 0 && <div style={{
                    whiteSpace: 'break-spaces'
                }} className="text-tiempo">
                    <p>            {horas.mensaje}
                    </p>
                </div>}
                <div className="temporizador">
                    {laHora.s >= 0 ? <div className="flex-row">
                        <span className={laHora.d <= 0 ? 'tiempo-d-off-1 tiempo-d-off tiempo-d column' : "tiempo-d column"}>
                            <span>d</span>
                            <span>{laHora.d <= 0 ? '0' : laHora.d > 9 ? laHora.d : `0${laHora.d}`}  </span>

                        </span>
                        {<div className={laHora.d <= 0 ? 'ocult' : "dosp"}>
                            :
                        </div>}
                        <span className={laHora.d <= 0 && laHora.h <= 0 ? 'tiempo-d-off-2 tiempo-d-off tiempo-d column' : "tiempo-d column"}>
                            <span>h</span>
                            <span>{laHora.h <= 0 ? laHora.d > 0 ? '00' : '0' : laHora.h > 9 ? laHora.h : `0${laHora.h}`}  </span>

                        </span>
                        {<div className={laHora.d <= 0 && laHora.h <= 0 ? 'ocult' : "dosp"}>
                            :
                        </div>}
                        <span className={laHora.m <= 0 ? 'tiempo-d-off tiempo-d column' : "tiempo-d column"}>
                            <span>m</span>
                            <span>{laHora.m <= 0 ? '00' : laHora.m > 9 ? laHora.m : `0${laHora.m}`}  </span>

                        </span>
                        {<div className={laHora.m <= 0 ? 'ocult' : "dosp"}>
                            :
                        </div>}
                        <span className={laHora.s < 0 ? 'tiempo-d-off tiempo-d column' : "tiempo-d column"}>
                            <span>s</span>
                            <span>{laHora.s <= 0 ? '00' : laHora.s > 9 ? laHora.s : `0${laHora.s}`} </span>

                        </span>




                    </div> : <>
                        <p> {lang === 'es' ? 'FINALIZADO' : 'END'}</p></>}
                </div>
            </div>

        </>
    );
};
export default RelojInteractivo;
