import client from '../client'

export default async function deleteFollow(following_id: number) {
  const response = await client.delete<number>('/follow', {
    data: { following_id },
  })
  return response.data
}
