'use client'

import MobileDetect from "mobile-detect";
import { useEffect } from 'react';


const Redirect = (props) => {
    useEffect(() => {
        let isMobile = new MobileDetect(navigator.userAgent)
        if ((isMobile.is('iPhone') || isMobile.is('Android') || isMobile.tablet() !== null || isMobile.phone() !== null || isMobile.mobile() !== null)) {
            if (isMobile.is('iPhone')) {
                window.location.replace("https://apps.apple.com/us/app/pokerlap/id1585178709");
            }
            if (isMobile.is('Android')) {
                window.location.replace("https://play.google.com/store/apps/details?id=com.pokerlap");
            }
            if (!isMobile.is('iPhone') && !isMobile.is('Android') && (isMobile.tablet() || isMobile.phone() || isMobile.mobile())) {
                window.location.replace("https://play.google.com/store/apps/details?id=com.pokerlap");

            }

        } else {
            window.location.replace('https://www.pokerlap.com/')
        }
    }, [])


    return (
        <>
        </>
    );
};

export default Redirect 
