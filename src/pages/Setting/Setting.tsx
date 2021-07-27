import { css } from '@emotion/react'
// import { useProfileStateValue } from '../../atoms/profileState'
import ProfileSection from './ProfileSection'
import FavoriteBookSection from './FavoriteBookSection'
import ProfileImageUpload from './ProfileImageUpload'
import media from '../../lib/styles/media'
import { Helmet } from 'react-helmet-async'

export type SettingProps = {}

function Setting({}: SettingProps) {
  // const profile = useProfileStateValue()

  return (
    <div css={wrapper}>
      <Helmet>
        <title>프로필 수정 – Central Book</title>
      </Helmet>
      <div css={profileWrapper}>
        <ProfileImageUpload />
        <ProfileSection />
      </div>
      <FavoriteBookSection />
    </div>
  )
}

const wrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;

  margin-left: 12rem;
  margin-right: 12rem;
  font-size: 1.3rem;

  ${media.medium} {
    margin-top: 6rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }

  ${media.small} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

const profileWrapper = css`
  display: flex;
  margin-bottom: 3rem;
`

export default Setting
