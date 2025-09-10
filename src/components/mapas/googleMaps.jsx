import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from 'rlayers';
const GooglMapsComp = (props) => {
    const { nombreClub = '', ubicacion = { lat: 27.672932021393862, lon: 85.31184012689732 }, openUrl = console.log } = props
    let map = false


    return (
        <>
            <div className="mapa">
                {parseFloat(ubicacion.lat) && parseFloat(ubicacion.lon) && <RMap className='example-map' initial={{ center: fromLonLat([parseFloat(ubicacion.lon), parseFloat(ubicacion.lat)]), zoom: 17 }}>
                    {/* Use an OpenStreetMap background */}
                    <ROSM />
                    {/* Create a single layer for holding vector features */}
                    <RLayerVector onClick={openUrl} zIndex={10}>
                        {/* Create a style for rendering the features */}
                        <RStyle.RStyle >
                            {/* Consisting of a single icon, that is slightly offset
             * so that its center falls over the center of the feature */}
                            <RStyle.RIcon  src={'/multimedia/icons/marker.png'}  anchor={[0.5, 0.8]}
                            />
                        </RStyle.RStyle>
                        {/* Create a single feature in the vector layer */}
                        <RFeature
                            geometry={new Point(fromLonLat([parseFloat(ubicacion.lon), parseFloat(ubicacion.lat)]))}

                        >
                            <ROverlay className='example-overlay'>
                                <span onClick={openUrl} className='hover'>
                                    {nombreClub}

                                </span>

                            </ROverlay>
                        </RFeature>
                    </RLayerVector>
                </RMap >}

            </div >
        </>
    );
};
export default GooglMapsComp;