import { css } from '@emotion/react'
import Icon from '../../components/Icon'
import GoogleLoginButton from '../../components/GoogleLoginButton'
import { main_background } from '../../assets/images'
import { useUserState } from '../../atoms/authState'
import { useHistory } from 'react-router-dom'

export type AuthProps = {}

function Auth({}: AuthProps) {
  const [user] = useUserState()
  const history = useHistory()

  if (user) {
    history.replace(`/@${user?.username}/shelve/`)
  }

  return (
    <div css={AuthStyle}>
      <div css={LogoStyle}>📖Central Book</div>
      <Icon
        name="bookLover"
        style={{ width: '100%', maxWidth: '50rem', maxHeight: '50rem' }}
      />
      <GoogleLoginButton />
    </div>
  )
}

const AuthStyle = css`
  min-height: 100vh;
  padding-top: 4rem;
  padding-bottom: 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  background-image: url(${main_background});
`

const LogoStyle = css`
  font-size: 2rem;
  font-weight: bold;
  color: white;
`

export default Auth
