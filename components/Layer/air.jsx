import { useEffect, useState } from 'react';
import { CACHETTL } from '@/constants/thresholds';
import { Marker, Popup } from 'react-map-gl';

import st from './styles.module.scss';
import { getIndicatorLevel } from '@/utils/helpers';

const PopupMessage = ({ onClose, ...point }) => {
  return (
    <Popup
      longitude={point.longitude}
      latitude={point.latitude}
      onClose={onClose}
      offset={25}
      className={st.popup}
    >
      <div className={`${st.popup_title} color-indicator-${point.indicator.name} text-center`}>
        {point.indicator.description}
      </div>
      <div>Humidity: {point.humidity}%</div>
      <div>Temperature: {point.temperature}°F</div>
      <div>pm2.5: {point['pm2.5']}%</div>
    </Popup>
  );
};

const AirLayer = ({ zoom }) => {
  const [points, setPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const fetchApiData = () =>
      fetch('/api/layer/air')
        .then(res => res.json())
        .then(response => {
          setPoints(response.filter(row => !!row.aqi));
        });

    fetchApiData();

    const interval = setInterval(() => {
      fetchApiData();
    }, CACHETTL.air * 1000);

    return () => interval && clearInterval(interval);
  }, []);

  if (!points.length) {
    return null;
  }

  const fullMarker = zoom >= 13;

  return (
    <>
      {points.map(point => {
        const indicator = getIndicatorLevel('air', point.aqi);
        if (!indicator) {
          return null;
        }

        return (
          <Marker
            key={`${point.latitude}${point.longitude}_air`}
            latitude={point.latitude}
            longitude={point.longitude}
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo({
                ...point,
                indicator,
              });
            }}
          >
            <div
              className={`${fullMarker ? st.airmarker : st.airmarker_point} bg-${indicator?.name}`}
            >
              {fullMarker && point.aqi}
            </div>
          </Marker>
        );
      })}
      {popupInfo && <PopupMessage {...popupInfo} onClose={() => setPopupInfo(false)} />}
    </>
  );
};

export default AirLayer;
