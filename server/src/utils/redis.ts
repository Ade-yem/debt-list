import * as redis from 'redis';
import {config} from "dotenv"

config()

export const client = redis.createClient({
      password: process.env.REDIS_PASSWORD as string,
      socket: {
          host: process.env.REDIS_HOST_URL as string,
          port: 18400
      }
    }).on('error', (err) => {
      console.error(`Redis connection error is: ${err}`);
    })
await client.connect()

export function isAlive() {
    return client.isReady;
}

export async function setKey(key: string, value: string, duration: number) {
  await client.set(key, value, { 'EX': duration });
}

export async function getKey(key: string) {
  const res = await client.get(key);
  return res;
}

export async function deleteKey(key: string) {
  await client.del(key);
}