import purpleair from '@/services/purple';

export default async function handler(req, res) {
  res.status(200).json(await purpleair.getSensors());
}
