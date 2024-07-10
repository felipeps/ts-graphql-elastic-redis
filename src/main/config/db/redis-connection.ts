import { createClient, RedisClientType } from 'redis'

let client: unknown

export const getClient = (): RedisClientType => {
  if (!client) {
    throw new Error('Redis client not connected')
  }

  return client as RedisClientType
}

export const connectRedis = async (uri: string) => {
  client = await createClient({
    url: uri
  }).on('error', err => console.log('Redis Client Error', err)).connect()
}
