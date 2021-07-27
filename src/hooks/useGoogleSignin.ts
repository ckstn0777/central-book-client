import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGoogleTokenState } from '../atoms/authState'
import checkGoogleRegisterd from '../lib/api/auth/checkGoogleRegisted'
import googleSignin from '../lib/api/auth/googleSignin'
import logger from '../lib/logger'
import useAuth from './useAuth'

export default function useGoogleSignin() {
  const [isLoading, setIsLoading] = useState(false)
  const [, setGoogleToken] = useGoogleTokenState()
  const { authorize } = useAuth()
  const history = useHistory()

  const signin = useCallback(
    async (accessToken: string) => {
      setGoogleToken(accessToken)

      try {
        const exists = await checkGoogleRegisterd(accessToken)
        if (exists) {
          const { user } = await googleSignin(accessToken)
          authorize(user)
          logger.login()
          setIsLoading(false)
          history.replace(`/@${user?.username}/shelve/`)
        } else {
          // signin
          setIsLoading(false)
          history.push('/register')
        }
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    },
    [history, setGoogleToken, authorize]
  )

  return { signin, isLoading, setIsLoading }
}
