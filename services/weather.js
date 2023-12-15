import SunCalc from 'suncalc';
import { CACHETTL } from '@/constants/thresholds';
import { wrap } from './cache';
import { MAP_CENTER } from '@/constants/map';

export function getWeather() {
  const LAT = MAP_CENTER.latitude;
  const LNG = MAP_CENTER.longitude;
  return wrap('weather', CACHETTL.weather, async () => {
    const params = new URLSearchParams({
      q: `${LAT},${LNG}`,
      aqi: 'no',
      key: process.env.WEATHER_API_KEY,
    });

    const { sunrise, sunset } = SunCalc.getTimes(new Date(), LAT, LNG);

    const weather = await fetch(`https://api.weatherapi.com/v1/current.json?${params}`)
      .then(res => res.json())
      .then(data => {
        if (!data.current) {
          console.error('Error Weather API: Empty data', data);
          return null;
        }
        return data.current;
      });

    return {
      ...weather,
      sunset,
      sunrise,
    };
  });
}
