import { useCallback } from 'react'
import { useProfileStateValue, useSetProfileState } from '../atoms/profileState'
import getMyProfile from '../lib/api/me/getMyProfile'

export default function useMyProfile() {
  const setProfile = useSetProfileState()
  const profile = useProfileStateValue()

  const loadProfile = useCallback(
    async pathUsername => {
      try {
        const profile = await getMyProfile(pathUsername)
        setProfile(profile)
      } catch (e) {}
    },
    [setProfile]
  )

  return { profile, loadProfile }
}
