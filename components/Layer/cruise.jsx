import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';

import st from './styles.module.scss';

const CruiseMarker = ({ latitude, longitude, onClick }) => {
  return (
    <Marker latitude={latitude} longitude={longitude} onClick={onClick}>
      <div className={`${st.cruisemarker} flex items-center justify-center`}>
        <span className="material-symbols-outlined">directions_boat</span>
      </div>
    </Marker>
  );
};

const CruiseLayer = () => {
  const [points, setPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    fetch('/api/layer/cruise')
      .then(res => res.json())
      .then(response => {
        if (response?.features?.length) {
          const filtered = response.features
            .filter(f => f.type === 'Feature' && f.geometry.type === 'Point')
            .map(f => ({
              latitude: f.geometry.coordinates[1],
              longitude: f.geometry.coordinates[0],
              properties: f.properties,
            }));
          setPoints(filtered);
        }
      });
  }, []);

  if (!points.length) {
    return null;
  }

  return (
    <>
      {points.map((point, index) => (
        <CruiseMarker
          key={`${point.latitude}_${index}`}
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            if (point.properties?.cruise_message) {
              setPopupInfo({
                longitude: point.longitude,
                latitude: point.latitude,
                message: point.properties.cruise_message,
              });
            }
          }}
          {...point}
        />
      ))}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          // anchor="top"
          onClose={() => setPopupInfo(false)}
          className="cruisepopup"
          offset={20}
        >
          {popupInfo.message}
        </Popup>
      )}
    </>
  );
};

export default CruiseLayer;
