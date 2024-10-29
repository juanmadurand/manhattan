import { useEffect, useState } from 'react';
import { CACHETTL } from '@/constants/thresholds';
import { Marker, Popup } from 'react-map-gl';

import st from './styles.module.scss';

const PopupMessage = ({ data }) => {
  return (
    <div>
      <h4>{data.station_name}</h4>
      bikes_available: {data.num_bikes_available} <br />
      bikes_disabled: {data.num_bikes_disabled} <br />
      docks_available: {data.num_docks_available} <br />
      docks_disabled: {data.num_docks_disabled} <br />
      ebikes_available: {data.num_ebikes_available} <br />
      station_capacity: {data.station_capacity} <br />
    </div>
  );
};

const BikeLayer = ({ zoom }) => {
  const [points, setPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const fetchApiData = () =>
      fetch('/api/layer/bike')
        .then(res => res.json())
        .then(stations => {
          setPoints(stations);
        });

    fetchApiData();

    const interval = setInterval(() => {
      fetchApiData();
    }, CACHETTL.bike * 1000);

    return () => interval && clearInterval(interval);
  }, []);

  if (!points.length) {
    return null;
  }

  return (
    <>
      {points.map(point => {
        const percentBikes = Math.round(
          ((point.num_bikes_available - point.num_ebikes_available) / point.station_capacity) * 100
        );
        const percentEBikes = Math.round(
          (point.num_ebikes_available / point.station_capacity) * 100
        );
        const background = `
          radial-gradient(closest-side, black 79%, transparent 80% 100%),
          conic-gradient(#ff3a3a ${percentBikes}%, blue ${percentBikes}% ${
          percentBikes + percentEBikes
        }%, gray 0)
      `;
        return (
          <Marker
            key={`${point.latitude}${point.longitude}_bike`}
            latitude={point.latitude}
            longitude={point.longitude}
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(point);
            }}
          >
            {zoom >= 13 ? (
              <div className={st.bikemarker} style={{ background }} data-test="marker-bike">
                <span className="material-symbols-outlined">pedal_bike</span>
              </div>
            ) : (
              <div className={st.bikemarker_point} />
            )}
          </Marker>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(false)}
          offset={25}
        >
          <PopupMessage data={popupInfo} />
        </Popup>
      )}
    </>
  );
};

export default BikeLayer;
