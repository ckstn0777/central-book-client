import { useCallback } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useUserState } from '../atoms/authState'
import { User } from '../lib/api/types'
import userStorage from '../lib/storage/userStorage'

export default function useAuth() {
  const { signOut } = useGoogleLogout({
    clientId:
      '1038856616662-2u26cq72g75ug01c9jjs1jbu6pdhqkni.apps.googleusercontent.com',
    onLogoutSuccess: () => logoutSuccess(),
  })
  const [, setUserState] = useUserState()
  const history = useHistory()
  // const location = new Location()

  const authorize = (user: User) => {
    setUserState(user)
    userStorage.set(user)
  }

  const logout = useCallback(() => {
    signOut()
    // window.location.reload()
    // location.reload();
  }, [signOut])

  const logoutSuccess = useCallback(() => {
    userStorage.clear()
    setUserState(null)
    history.replace('/')
  }, [setUserState, history])

  return {
    authorize,
    logout,
    // reloadSetUserState,
  }
}
