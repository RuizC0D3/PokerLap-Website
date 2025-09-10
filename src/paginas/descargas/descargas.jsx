'use client'

import Image from "next/image"
import { useState } from "react"
import PageHead from "../../components/body/pageHead"

const Descargas = (props) => {
    const { setOpt = console.log, lang = 'es' } = props
    const [carrulselVista, setcarrulselVista] = useState(0)
    const descargasArray = [
        { archivo: { nombre: 'Caja.exe', url: 'https://pokerlap.s3.amazonaws.com/Caja.exe' }, descripcion: 'Aplicativo windows para realizar el registro de los jugadores', nombre: 'Caja' },



        { archivo: { nombre: 'Dealer.apk', url: 'https://pokerlap.s3.amazonaws.com/dealer.apk' }, descripcion: 'APK Tabletas Android	', nombre: 'App Dealer	' },



        { archivo: { nombre: 'impresora.exe', url: 'https://pokerlap.s3.amazonaws.com/impresora.exe' }, descripcion: 'Driver impresora Gainscha	', nombre: 'Impresora #1' },



        { archivo: { nombre: 'xp.exe', url: 'https://pokerlap.s3.amazonaws.com/xp.exe' }, descripcion: 'Driver impresora XPrinter	', nombre: 'Impresora #2' },



        { archivo: { nombre: 'Rongta.exe', url: 'https://pokerlap.s3.amazonaws.com/Rongta.exe' }, descripcion: 'Driver impresora Rongta', nombre: 'Impresora #3' },


    ]
    return (
        <>
            <div className="descargas-container">
                <PageHead  lang= { lang }setOpt={setOpt} page={'Descargas'} />
                <div className="tabla-descargas">
                    <h5 className="mb-10 mt-10" >{Textos[lang].descargas}</h5>

                    <p className="descargas-tabla tabla-header">
                        <span className="descargas_Producto">{Textos[lang].producto}</span>
                        <span className="descargas_Descripcion">{Textos[lang].descripción}</span>
                        <span className="descargas_Archivo">{Textos[lang].archivo}</span>
                    </p>
                    {descargasArray.map((key, i) => {
                        return (
                            <><p className="descargas-tabla tabla-body"/*   */ key={`seccion-menu-${i}`} id={`seccion-menu-${i}`}>
                                <span className="descargas_Producto">{key.nombre}</span>
                                <span className="descargas_Descripcion">{key.descripcion}</span>
                                <a className="descargas_Archivo" href={key.archivo.url}>{key.archivo.nombre}</a>
                            </p>
                            </>
                        )
                    })}
                </div>


            </div>
        </>

    )
}
export default Descargas


export const Textos = {
    es: {
        descargas: 'Descargas',
        producto: 'Productos',
        archivo: 'Archivo',
        descripcion: 'Descripción'
    },
    en: {
        descargas: 'Downloads',
        producto: 'Product',
        archivo: 'File',
        descripcion: 'Resume'
    },
    ger: {
        descargas: 'Downloads',
        producto: 'Product',
        archivo: 'File',
        descripcion: 'Resume'
    },
    prt: {
        descargas: 'Downloads',
        producto: 'Product',
        archivo: 'File',
        descripcion: 'Resume'
    },
    fr: {
        descargas: 'Downloads',
        producto: 'Product',
        archivo: 'File',
        descripcion: 'Resume'
    }
}
