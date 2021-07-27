import client from '../client'

export default async function checkGoogleRegisterd(accessToken: string) {
  const response = await client.post<CheckGoogleRegisterdResult>(
    '/auth/google/check',
    {
      access_token: accessToken,
    }
  )

  return response.data.exists
}

type CheckGoogleRegisterdResult = {
  exists: boolean
}
