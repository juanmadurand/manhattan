import { useEffect, useState } from 'react';
import { dateToTime } from '@/utils/helpers';
import st from './styles.module.scss';

export default function WeatherBar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(response => {
        setData(e => ({
          ...e,
          ...response,
        }));
      });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className={`${st.weatherbar} flex`}>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">wb_twilight</span>
        <span className="ml-1">{dateToTime(data.sunrise)}</span>
      </div>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">rainy</span>
        <span className="ml-1">{data.precip_mm}mm</span>
      </div>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">air</span>
        <span className="ml-1">{data.wind_mph}mph</span>
      </div>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">thermometer</span>
        <span className="ml-1">{data.temp_f}°F</span>
      </div>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">humidity_percentage</span>
        <span className="ml-1">{data.humidity}%</span>
      </div>
      <div className={`${st.weatherbar_item} flex items-center`}>
        <span className="material-symbols-outlined">nightlight</span>
        <span className="ml-1">{dateToTime(data.sunset)}</span>
      </div>
    </div>
  );
}
