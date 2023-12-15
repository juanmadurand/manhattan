import { NWLAT, NWLNG, SELAT, SELNG } from '@/constants/map';
import { wrap } from './cache';
import { CACHETTL } from '@/constants/thresholds';

const BASE_URL = 'https://gbfs.citibikenyc.com/gbfs/en';

const isInsideBoundingBox = ({ lon, lat }) => {
  return lat > SELAT && lat < NWLAT && lon > NWLNG && lon < SELNG;
};

async function _getBikeStatus() {
  try {
    const stations = await fetch(`${BASE_URL}/station_information.json`)
      .then(res => res.json())
      .then(response => {
        if (!response?.data?.stations?.length) {
          return [];
        }
        return response.data.stations
          .filter(station => isInsideBoundingBox(station) && station.region_id === '71')
          .map(station => ({
            region_id: station.region_id,
            longitude: station.lon,
            latitude: station.lat,
            id: station.station_id,
            name: station.name,
            capacity: station.capacity,
            station_type: station.station_type,
          }));
      });

    return fetch(`${BASE_URL}/station_status.json`)
      .then(res => res.json())
      .then(response => {
        if (!response?.data?.stations?.length) {
          return [];
        }
        return response.data.stations
          .map(status => {
            const station = stations.find(s => s.id === status.station_id);

            if (!station) {
              return null;
            }
            if (status.num_ebikes_available === 0) {
              return null;
            }

            return {
              ...status,
              latitude: station.latitude,
              longitude: station.longitude,
              station_name: station.name,
              station_capacity: station.capacity,
              station_region_id: station.region_id,
              station_station_type: station.station_type,
            };
          })
          .filter(s => !!s);
      });
  } catch (err) {
    console.error('fetching Bike API', err);
    return [];
  }
}

export function getBikeStatus() {
  return wrap('bikestatus', CACHETTL.bike, _getBikeStatus);
}
