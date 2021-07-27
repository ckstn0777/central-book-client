import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGoogleTokenState, useUserState } from '../atoms/authState'
import googleSignup from '../lib/api/auth/googleSignup'
import logger from '../lib/logger'
import useAuth from './useAuth'

export default function useGoogleSignup() {
  const [user] = useUserState()
  const [googleToken] = useGoogleTokenState()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const { authorize } = useAuth()

  const signup = useCallback(
    async userData => {
      try {
        if (!googleToken) {
          return
        }
        setLoading(true)
        const { user } = await googleSignup(googleToken, userData)
        authorize(user)
        logger.signUp()
        history.replace(`/@${user?.username}/shelve/`)
      } catch (e) {
        throw e
      } finally {
        setLoading(false)
      }
    },
    [googleToken, setLoading, history, authorize]
  )

  return {
    loading,
    signup,
  }
}
