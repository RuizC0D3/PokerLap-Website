'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import ClubVistaIndividual from "./clubVista"
import TorneoIndividual from "../torneos/torneoIndividual"

const ClubIndividual = (props) => {
    const {enClub=false, club = { ID_Club: 0, torneo: false, torneos: [] }, clubs = [], torneos = [] } = props
    const [clubTorneo, setClubTorneo] = useState({ state: false, torneo: {} })
    useEffect(() => {
        torneos.map((key, i) => {
            if (key.ID_Club === club.ID_Club) {
                setClubTorneo({ ...clubTorneo, state: true, torneo: key })
            }
        })
    }, [torneos])
    return (
        <>
            <div className="clubs-container">


                <div className="clubs-container-center ">

                    <ClubVistaIndividual vista club={club} />
                    {club.torneo && club.torneos.length && club.torneos.length > 0 && <div>
                        <h5 className="mb-10 mt-10" >TORNEOS ACTIVOS</h5>
                        {

                            club.torneo && club.torneos.map((key, i) => {
                                return (
                                    <>
                                        <TorneoIndividual enClub={enClub} clubs={clubs} torneo={key} />
                                    </>
                                )
                            })
                        }
                    </div>}

                </div >

            </div >
        </>

    )
}
export default ClubIndividual


