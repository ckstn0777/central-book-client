import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { useSelectProfileState } from '../../atoms/profileState'
import Input from '../../components/Input'
import Button from '../../components/Button'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'
import { useMutation } from 'react-query'
import updateMyProfile from '../../lib/api/me/updateMyProfile'
import React from 'react'
import { toast } from 'react-toastify'
import isAxiosError from '../../lib/utils/isAxiosError'

type patchData = {
  type: string
  display_name: string
  information: string
}

export type ProfileSectionProps = {}

function ProfileSection({}: ProfileSectionProps) {
  const [profile, setProfile] = useSelectProfileState()

  const [modify, setModify] = useState(false)
  const [displayName, setDisplayName] = useState(profile.display_name)
  const [information, setInformation] = useState(profile.information)

  const mutation = useMutation<any, unknown, patchData>(profile =>
    updateMyProfile(profile)
  )

  const onSubmit = useCallback(() => {
    const patchData = {
      type: 'profile',
      display_name: displayName,
      information,
    }
    mutation.mutate(patchData)
  }, [displayName, information, mutation])

  useEffect(() => {
    if (mutation.isSuccess) {
      setProfile(prev => ({
        ...prev,
        display_name: displayName,
        information,
      }))
      setModify(false)
      mutation.reset()
    }

    if (mutation.isError) {
      if (isAxiosError(mutation.error)) {
        toast.error(mutation.error.response?.data.message)
      }
      mutation.reset()
    }
  }, [mutation, setProfile, displayName, information])

  return (
    <div css={wrapper}>
      {!modify ? (
        <div>
          <h1>{displayName}</h1>
          <p>{information}</p>
          <button className="update-btn" onClick={() => setModify(true)}>
            수정
          </button>
        </div>
      ) : (
        <div css={UpdateWrapper}>
          <Input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <Input
            value={information}
            onChange={e => setInformation(e.target.value)}
          />
          <Button text="저장" onClick={onSubmit} />
        </div>
      )}
    </div>
  )
}

const wrapper = css`
  width: 55vw;
  padding: 1rem 2rem;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin: 0.5rem 0;
  }
  .update-btn {
    ${resetButton}
    cursor: pointer;
    text-decoration: underline;
    color: ${palette.cyan[500]};
    font-size: 1.3rem;
  }
`

const UpdateWrapper = css`
  // font-size: 1.2rem;
  & > * {
    margin-bottom: 1rem;
  }
`

export default React.memo(ProfileSection)
