import { getClient } from '../../../main/config/db/redis-connection.js'

export const getCachedData = async (key: string): Promise<any> => {
  const client = getClient()
  const data = await client.get(key)
  return data
}

export const setCachedData = async (key: string, data: string): Promise<void> => {
  const client = getClient()
  await client.set(key, data)
}
