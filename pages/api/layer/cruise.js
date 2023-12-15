import { getCruisePoints } from '@/services/cruise';

export default async function handler(req, res) {
  res.status(200).json(await getCruisePoints());
}
