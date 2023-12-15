import { useEffect, useState } from 'react';
import { CACHETTL } from '@/constants/thresholds';
import { Marker, Popup } from 'react-map-gl';

import st from './styles.module.scss';

const PopupMessage = ({ data }) => {
  return (
    <div>
      <h4>{data.stop_name}</h4>
      {data.stops.map((stop, index) => (
        <div key={`${data.tripId}_${index}`}>
          Arrival: {stop.arrival && <div className="py-1">{stop.arrival}</div>}
          Departure: {stop.departure && <div className="py-1">{stop.departure}</div>}
        </div>
      ))}
    </div>
  );
};

const FerryLayer = () => {
  const [points, setPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const fetchApiData = () =>
      fetch('/api/layer/ferry')
        .then(res => res.json())
        .then(p => {
          setPoints(p);
        });

    fetchApiData();

    const interval = setInterval(() => {
      fetchApiData();
    }, CACHETTL.ferry * 1000);

    return () => interval && clearInterval(interval);
  }, []);

  if (!points.length) {
    return null;
  }

  return (
    <>
      {points.map((point, index) => {
        return (
          <Marker
            key={`${point.stop_lat}${point.stop_lon}_ferry_${index}`}
            latitude={point.stop_lat}
            longitude={point.stop_lon}
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(point);
            }}
          >
            <div className={`${st.ferrymarker} flex items-center justify-center`}>
              <span className="material-symbols-outlined">sailing</span>
            </div>
          </Marker>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={popupInfo.stop_lon}
          latitude={popupInfo.stop_lat}
          onClose={() => setPopupInfo(false)}
          offset={25}
          anchor="top"
        >
          <PopupMessage data={popupInfo} />
        </Popup>
      )}
    </>
  );
};

export default FerryLayer;
