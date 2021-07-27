import client from '../client'

export default async function updateMyProfile(profile: object) {
  const response = await client.patch('/me', profile)
  return response.data
}
