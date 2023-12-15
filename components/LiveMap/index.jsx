import { useState } from 'react';

import AppMap from '@/components/AppMap';
import LayerNav from '@/components/LayerNav';
import { LAYER } from '@/constants/layer';
import WeatherBar from '@/components/WeatherBar';
import CruiseLayer from '@/components/Layer/cruise';
import AirLayer from '@/components/Layer/air';
import BikeLayer from '@/components/Layer/bike';
import FerryLayer from '@/components/Layer/ferry';
import { GlobalContextProvider } from '@/components/GlobalContext';

export default function LiveMap() {
  const [layers, setLayers] = useState([LAYER.air]);
  const [currentZoom, setZoom] = useState(14);

  const handleSelect = l => {
    const remove = layers.includes(l);

    if (remove) {
      setLayers(prev => prev.filter(p => p !== l));
    } else {
      setLayers(prev => [...prev, l]);
    }
  };

  const handleZoom = ({ viewState }) => {
    setZoom(viewState.zoom);
  };

  return (
    <GlobalContextProvider>
      <div className="livemap">
        <AppMap type="live" onZoom={handleZoom} initialZoom={12.5}>
          {layers.includes(LAYER.bike) && <BikeLayer zoom={currentZoom} />}
          {layers.includes(LAYER.cruise) && <CruiseLayer />}
          {layers.includes(LAYER.ferry) && <FerryLayer />}
          {layers.includes(LAYER.air) && <AirLayer zoom={currentZoom} />}
        </AppMap>
        <WeatherBar />
        <LayerNav onSelect={handleSelect} layers={layers} />
      </div>
    </GlobalContextProvider>
  );
}
