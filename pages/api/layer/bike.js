import { getBikeStatus } from '@/services/bike';

export default async function handler(req, res) {
  res.status(200).json(await getBikeStatus());
}
