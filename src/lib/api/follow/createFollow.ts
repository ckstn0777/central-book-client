import client from '../client'

export default async function createFollow(following_id: number) {
  const response = await client.post('/follow', { following_id })
  return response.data
}
