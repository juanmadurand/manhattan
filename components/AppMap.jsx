import Map, { GeolocateControl } from 'react-map-gl';

import { useContext, useEffect, useState } from 'react';
import { getCssPxProp } from '@/utils/helpers';
import { GlobalContext } from './GlobalContext';
import { MAPBOX_BOUNDS, MAP_CENTER } from '@/constants/map';

export default function AppMap({ children, initialZoom, ...mapProps }) {
  const [height, setHeight] = useState('100vh');
  const { showMessageModal } = useContext(GlobalContext);

  const handleOutOfBounds = () => {
    showMessageModal(
      "It appears that you're outside of Manhattan, and since this is a hyper-local app, we're unable to display your current location."
    );
  };

  useEffect(() => {
    const appHeight = () => {
      const bottomHeight = getCssPxProp('--bottom-nav-height');
      setHeight(`${window.innerHeight - bottomHeight}px`);
    };

    window.addEventListener('resize', appHeight);
    appHeight();

    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  return (
    <Map
      initialViewState={{
        ...MAP_CENTER,
        zoom: initialZoom || 14,
      }}
      style={{ width: '100%', height }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      maxBounds={MAPBOX_BOUNDS}
      maxZoom={18}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...mapProps}
      dragRotate={false}
      // attributionControl={false}
    >
      <GeolocateControl
        onOutOfMaxBounds={handleOutOfBounds}
        position="bottom-right"
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {children}
    </Map>
  );
}
