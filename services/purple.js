import { NWLAT, NWLNG, SELAT, SELNG } from '@/constants/map';
import { wrap } from './cache';
import { CACHETTL } from '@/constants/thresholds';

const API_KEY = process.env.PURPLE_API_KEY_READ;

const FIELDS = [
  'name',
  'icon',
  'latitude',
  'longitude',
  'humidity',
  'temperature',
  'voc',
  'pm1.0',
  'pm1.0_a',
  'pm2.5',
  'pm2.5_alt',
  'pm2.5_10minute',
  'pm2.5_10minute_a',
];

class PurpleAirAPI {
  static SENSORS_MEMC_KEY = 'purpleairsensors';
  static API_BASE = 'https://api.purpleair.com/v1/sensors';

  aqiFromPm(pm) {
    const table = [
      [0.0, 12.0, 0, 50],
      [12.1, 35.4, 51, 100],
      [35.5, 55.4, 101, 150],
      [55.5, 150.4, 151, 200],
      [150.5, 250.4, 201, 300],
      [250.5, 500.4, 301, 500],
    ];
    const computeAqi = (concI, [concLo, concHi, aqiLo, aqiHi]) =>
      Math.round(((concI - concLo) / (concHi - concLo)) * (aqiHi - aqiLo) + aqiLo);
    const values = table.find(data => pm <= data[1]);
    return values ? computeAqi(pm, values) : 500;
  }

  async _parseResponse(response) {
    try {
      const { fields, data, error, description } = response;

      if (error) {
        console.error('PurpleAir fetch response:', error, description);
        return [];
      }

      let sensors = [];
      for (const sensorData of data) {
        const sensor = {};
        for (let i = 0; i < fields.length; i++) {
          sensor[fields[i]] = sensorData[i];
        }

        sensor.aqi = this.aqiFromPm(sensor['pm2.5_10minute']);
        sensor.count = sensor.aqi;
        sensors.push(sensor);
      }

      return sensors;
    } catch (error) {
      console.error('PurpleAir parse response:', error);
    }
  }

  getSensors() {
    return wrap(PurpleAirAPI.SENSORS_MEMC_KEY, CACHETTL.air, () => {
      const params = new URLSearchParams({
        api_key: API_KEY,
        fields: FIELDS.join(','),
        nwlng: NWLNG,
        nwlat: NWLAT,
        selng: SELNG,
        selat: SELAT,
      });

      return fetch(`${PurpleAirAPI.API_BASE}?${params}`)
        .then(r => r.json())
        .then(r => this._parseResponse(r))
        .catch(error => {
          console.error('Fetching PurpleAir:', error);
          return null;
        });
    });
  }
}

const purpleAirAPI = new PurpleAirAPI();
export default purpleAirAPI;
