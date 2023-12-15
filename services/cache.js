import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function wrap(key, ttl = 600, callback) {
  const exists = await redis.exists(key);

  if (exists) {
    const cached = await redis.get(key);
    return JSON.parse(cached || '[]');
  }

  const value = await callback();
  await redis.set(key, JSON.stringify(value), 'EX', ttl);

  return value;
}
