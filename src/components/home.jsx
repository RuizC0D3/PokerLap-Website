'use client'
import Image from "next/image";
import LandingSelect from "./landing";
import MobileDetect from "mobile-detect";
import { useEffect, useState } from 'react';


const Landing = (props) => {
  const { res = false, club = false , delact = false} = props;

  const [onMobil, setOnMobil] = useState({ state: false, data: {} })
  useEffect(() => {
    let isMobile = new MobileDetect(navigator.userAgent)
    if ((isMobile.is('iPhone') || isMobile.is('Android') || isMobile.tablet() !== null || isMobile.phone() !== null || isMobile.mobile() !== null)) {
        setOnMobil({ state: true, data: isMobile })
    }
}, [])

  return (
    <>
      <LandingSelect delact={delact} onMobil={onMobil} res={res} club={club} />
    </>
  );
};

export default Landing;
