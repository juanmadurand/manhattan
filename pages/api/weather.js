import { getWeather } from '@/services/weather';

export default async function handler(req, res) {
  res.status(200).json(await getWeather());
}
