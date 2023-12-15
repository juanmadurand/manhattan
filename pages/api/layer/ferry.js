import { getTrips } from '@/services/ferry';

export default async function handler(req, res) {
  res.status(200).json(await getTrips());
}
