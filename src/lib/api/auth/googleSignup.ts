import client from '../client'
import { User } from '../types'

export default async function googleSignup(accssToken: string, userData: any) {
  const response = await client.post<GoogleSignupResult>(
    '/auth/google/signup',
    {
      access_token: accssToken,
      user_data: userData,
      // TODO: add userData
    }
  )

  return response.data
}

type GoogleSignupResult = {
  user: User
  access_token: string
}
