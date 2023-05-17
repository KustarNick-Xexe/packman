import React, { useState, useRef } from "react";
import { Map } from '@pbe/react-yandex-maps';
import ymaps from 'ymaps';

const RouteMap = ({ points }) => {
    const mapState = {
        center: points[0],
        zoom: 8
      };
    
    const [ymaps, setYmaps] = useState(null);
    const routes = useRef(null);

    const getRoute = ref => {
    ref.geoObjects.removeAll()
    if (ymaps) {
        const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
            referencePoints: [...points, points[0]],
            params: {
            results: 1
            }
        },
        {
            boundsAutoApply: true,
            routeActiveStrokeWidth: 3,
            routeActiveStrokeColor: "#7c3aed"
        }
        );

        routes.current = multiRoute;
        ref.geoObjects.add(multiRoute);
    }
    };

      return (
        <Map 
            className="border-2 border-zinc-200 shadow-inner" 
            state={mapState}
            style={{ filter: '', overflow: 'hidden', borderRadius: '10px', width: '500px', height: '600px' }}
            options={{
              suppressMapOpenBlock: 'false',
              suppressYandexLogo: 'false'
            }}
            modules={["multiRouter.MultiRoute"]}
            onLoad={ymaps => setYmaps(ymaps)}
            instanceRef={ref => ref && getRoute(ref)}
        />
      )
};

export default React.memo(RouteMap);