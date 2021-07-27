import { ProfileResult } from '../../../atoms/profileState'
import client from '../client'

export default async function getMyProfile(pathUsername: string) {
  const response = await client.get<ProfileResult>('/me', {
    params: { username: pathUsername },
  })
  return response.data
}
