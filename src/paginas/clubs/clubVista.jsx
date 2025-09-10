
'use client'

import Image from "next/image"
import { ModeloClub } from "../../modelos/modeloClub"
import { useEffect, useState } from "react"
import ResgresarImagenCorrecta from "../../funciones/regresarImg"

const ClubVistaIndividual = (props) => {
    const { torneoin = false, lang = 'es', vista = false, club = ModeloClub(), torneos = [] } = props
    const servicios = ['wifi', 'parking', 'creditcard', 'drinks', 'food', 'mobile']
    const [onShare, setOnShare] = useState(false)
    const ResgresarImagenCorrect = async (url) => {
        return await ResgresarImagenCorrecta(url, 1)
    }
    useEffect(() => { console.log(club); }, [club])
    return (
        <>

            <div className={` clubs-valores-hijo${121212} clubs-container-center-hijo`} key={`funciones-grid-${121212}`} id={`funciones-grid-${121212}`}>
                {club.open ? <></> : <></>}
                <div className="seccion-1 " >
                    <div className="club">
                        <div className="ans-club">
                            <div className="relativo">
                                {/*      Certificado               <Image src={`/servicios/abierto.png`} className="seccion-1-2" width={35} height={35} alt="logo-0" />
               */}                 {club.Estado && club.Estado > 1 && <Image src={`/servicios/trebol.png`} className={`${vista ? ' seccion-1-3' : 'hover seccion-1-3'}`} width={35} height={35} alt="logo-0" />}

                                {club.logo !== '' ? <>{ResgresarImagenCorrect() ? <img onClick={(e) => { e.preventDefault(); !vista && window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/clubs/${club.ID_Club}}`) }} src={`https://img.pkti.me/club/${club.logo}`} alt="seccionesimg" className={vista ? 'simg ' : "hover simg seccion-1-club"} /> : <Image src={`/multimedia/noimage.png`} className="brdr10" alt="seccionesimg" height={400} width={400} />}</> : <Image src={`/multimedia/noimage.png`} className="brdr10" alt="seccionesimg" height={400} width={400} />}
                            </div>
                        </div>
                    </div>
                    <div className="calificacion">
                        <p>
                            {club.calificacion ? club.calificacion : 5}
                        </p>
                        <Image className="seccion-1-star" src={`/multimedia/star.png`} width={30} height={30} alt="logo-star" />
                    </div>
                </div>
                <div className="seccion-2" >
                    <h5 className={vista ? 'mb-10 mt-10' : "hover mb-10 mt-10"} onClick={(e) => { e.preventDefault(); !vista && window.location.replace(`${process.env.NEXT_PUBLIC_FRONT_URL}/clubs/${club.ID_Club}`) }}>{club.Nombre}</h5>
                    <p>{club.Direccion}</p>
                    {/*                     {!vista && <span className="hover" onClick={(e) => { e.preventDefault(); !vista && window.location.replace(`./clubs/${club.ID_Club}`) }}>Ir</span>}
 */}
                    <div className="servicios">
                        {servicios.map((keyS, iS) => {
                            return (
                                <>
                                    {club.features && club.features.length > 0 && club.features.split('') && club.features.split('')[iS] && club.features.split('')[iS] === '1' ?
                                        <>
                                            {<Image src={`/servicios/${keyS}.png`} className="seccion-1-star" width={30} height={30} alt="logo-star" />}
                                        </> : <div className="opacity-img"><Image src={`/servicios/${keyS}.png`} className="seccion-1-star" width={30} height={30} alt="logo-star" /></div>}

                                </>
                            )
                        })}
                    </div>
                    <div className="seccion-3-xs seccion-3">
                        {vista ?
                            <div className="flex-row">
                                {<div onClick={(e) => { e.preventDefault(); window.open(`https://www.google.es/maps?q=${club.lat},${club.lon}`) }}>
                                    <Image src={`/servicios/ubicacion.png`} className="hover seccion-1-1" width={35} height={35} alt="logo-0" />
                                </div>
                                }
                                {club.Telefono && club.Telefono !== '' &&
                                    <><div onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/+${club.Telefono}?text=Hola,%20estoy%20navegando%20en%20Pokerlap%20y%20quisiera%20saber%20algo%20sobre%20${club.Nombre}`) }}><Image src={`/servicios/whatsapp.png`} className="hover seccion-1-2" width={35} height={35} alt="logo-div0" /></div></>
                                }
                                {!onShare ? <div onClick={(e) => { e.preventDefault(); setOnShare(true) }} >
                                    <Image src={`/servicios/share.png`} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                </div> : <><div className="abshare">
                                    <span onClick={(e) => { e.preventDefault(); setOnShare(false) }} className="hover">X</span>
                                    Share on
                                    <Image src={`/servicios/whatsapp.png`} onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/?text=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                    <Image src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg=="} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                </div></>}
                            </div>
                            : <div className="flex-row align-center">

                                <Image onClick={(e) => { e.preventDefault(); window.open(`https://www.google.es/maps?q=${club.lat},${club.lon}`) }} src={`/servicios/ubicacion.png`} className="hover seccion-1-1" width={35} height={35} alt="logo-0" />
                                {club.Telefono && club.Telefono !== '' &&
                                    <><div onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/+${club.Telefono}?text=Hola,%20estoy%20navegando%20en%20Pokerlap%20y%20quisiera%20saber%20algo%20sobre%20${club.Nombre}`) }}><Image src={`/servicios/whatsapp.png`} className="hover seccion-1-2" width={35} height={35} alt="logo-div0" /></div></>
                                }
                                {!onShare ? <div onClick={(e) => { e.preventDefault(); setOnShare(true) }}  >
                                    <Image src={`/servicios/share.png`} className="hover seccion-1-4" width={32} height={32} alt="logo-0" />
                                </div> : <><div className="abshare">
                                    <span onClick={(e) => { e.preventDefault(); setOnShare(false) }} className="hover">X</span>
                                    Share on

                                    <Image src={`/servicios/whatsapp.png`} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://api.whatsapp.com/send?text=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                    <Image src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg=="} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />

                                </div></>}
                            </div>}
                    </div>

                </div>
                <div className="seccion-3">
                    {vista ? <div className="flex-colunn ">
                        {<div className="flex-row hide-xss"><div onClick={(e) => { e.preventDefault(); window.open(`https://www.google.es/maps?q=${club.lat},${club.lon}`) }}>
                            <Image src={`/servicios/ubicacion.png`} className="hover seccion-1-1" width={35} height={35} alt="logo-0" />
                        </div>
                            {!onShare ? <div onClick={(e) => { e.preventDefault(); setOnShare(true) }}  >
                                <Image src={`/servicios/share.png`} className="hover seccion-1-4" width={32} height={32} alt="logo-0" />
                            </div> : <><div className="abshare">
                                <span onClick={(e) => { e.preventDefault(); setOnShare(false) }} className="hover">X</span>
                                Share on

                                <Image src={`/servicios/whatsapp.png`} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://api.whatsapp.com/send?text=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                <Image src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg=="} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />

                            </div></>}</div>
                        }
                        {club.Telefono && club.Telefono !== '' &&
                            <><div onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/+${club.Telefono}?text=Hola,%20estoy%20navegando%20en%20Pokerlap%20y%20quisiera%20saber%20algo%20sobre%20${club.Nombre}`) }}><Image src={`/servicios/whatsapp.png`} className="hover seccion-1-2" width={35} height={35} alt="logo-0" /></div></>
                        }
                    </div> : <> <div className="flex-colunn ">
                        {<div className="hide-xs flex-row"><div onClick={(e) => { e.preventDefault(); window.open(`https://www.google.es/maps?q=${club.lat},${club.lon}`) }}>
                            <Image src={`/servicios/ubicacion.png`} className="hover seccion-1-1" width={35} height={35} alt="logo-0" />
                        </div>
                            {!onShare ? <div onClick={(e) => { e.preventDefault(); setOnShare(true) }}  >
                                <Image src={`/servicios/share.png`} className="hover seccion-1-4" width={32} height={32} alt="logo-0" />
                            </div> : <><div className="abshare">
                                <span onClick={(e) => { e.preventDefault(); setOnShare(false) }} className="hover">X</span>
                                Share on

                                <Image src={`/servicios/whatsapp.png`} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://api.whatsapp.com/send?text=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />
                                <Image src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD30lEQVR4AayShW4cMRCGLQgzHArKDK9xor5KnyDMSZmZmZmZRWWuKMy8e3y7U8/KvXG6PlR+6dM3Wtv/tElYulnzHXI918HnvQZ7PNfgGfdvz1XQEJzFtz14B++y+crCO+D2XoG97ssw475swhwuGWSOK26T3zX24luWbZbehTxe1uS+YOiuCzGwOB+3mA2yAvcFU8cO7Mrsf30R3Lz4nfMcL+eglZyNkm3QGXZhJ0snzrOw3nE61uc4zQs4wmKOxC3PaIszZA4/I2On6zSsY8ni4P9Kx6loX/WJMCCOk5G47dCZ+r79HLtxR8LfueN45F318TDEORYiW4TJHBcvbf8QhT/TJoRiJkQME2bCJvRpJnwaM8TbuX24Q/k3wS82VR0JwRwOB8nSjF5xJgRvhgxIEtEj3kngLibHcQzc1YdDetWhICSj8iD5UW8MUsX+PoBGdNzJ/qXqQHBv5f4AVHCEBX4yp1LMG26EIJ2I+2hpFn18J8OsuQi5lXv9MxV7/ZAul35HIY0k7cCduJtV7tN95bt0sNgdt5g1sjR/GrX/+E9+j8DyI35xV7eh6q/cpftY2Q5tDwfSoVxYj5jwf5Yf4qV0j+bknXtY2bbZZxxIh9KtlkERfjaD52QFcgdSvl17xkq3zP4u3TwDSAlZAZ2pgmeZgrtZ6aZpraRrGpR0kuVZFTpXv1eBu1lpx5RW3DEFFu1kmWzSM21AiehC04wWc/uUxorbpn4XtU6CiuLWKcvZ5HVPxN7ZQkZwNytqnnxW1DwBSGETWSabnPsSkjuV4G5W2DC+hwPJyCZdL/22ngLJYt7DihonfAW1Y2BRR5bJJhtvaeL9OFoJ7mZrGiC3sHb8b6vlcdswFATRL2ZCDagAX12H+3DOOWe7A8d2fFQZlsRMXpzu6z8kVnGdPcDgDbRJ5InP/nFB3lFOTMlck1TVuW8gD8wzcRO3FeQfFvfeQUbeQU5M2K0yOGBJXlVjcmaO1HFTsernecPZTd/c3ZQ0CeTM7M+S3L0MNWbpT/a94abql7ebXDrburidECiZa5LsspZUZO+kzNI2Z31r9JPsmlx7M2namzHZG7J1vaQkp6qBff09csYN3FKS6jt5w1mPA2stos8sCb/b6zFzIPMcduOG+kzORjpurUaBtRKRuRwSsz8LqnpWQuaoV8MAu9V3VF/MG9Zi2DQXAxrwUlhSENeZA7aWwyY/+bc1tkKu/hOXxkLwZswHVLlTUlINNW0mjFnswC71W+FtGLOd+9ps+7k2qw/MtEmSrlNZB+c6z5jBrPo3nZNjzXQm1FTrjgSp6dYDakr3oFd9U+9y1lO9tTZT6gAAAABJRU5ErkJggg=="} onClick={(e) => { e.preventDefault(); setOnShare(false); window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.pokerlap.com/clubs/${club.ID_Club}`) }} className="hover seccion-1-4" width={35} height={35} alt="logo-0" />

                            </div></>}
                        </div>
                        }
                        {club.Telefono && club.Telefono !== '' &&
                            <><div onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/+${club.Telefono}?text=Hola,%20estoy%20navegando%20en%20Pokerlap%20y%20quisiera%20saber%20algo%20sobre%20${club.Nombre}`) }}><Image src={`/servicios/whatsapp.png`} className="hide-xs hover seccion-1-2" width={35} height={35} alt="logo-0" /></div></>
                        }
                    </div> </>}
                </div>
            </div >

        </>

    )
}
export default ClubVistaIndividual




export const Textos = {
    es: {
        visitar: 'Visitar'
    },
    en: {
        visitar: 'Visitar'
    },
    ger: {
        visitar: 'Besuchen'
    },
    prt: {
        visitar: 'Visita'
    },
    fr: {
        visitar: 'Visite'
    }
}





