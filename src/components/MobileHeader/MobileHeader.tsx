import { css } from '@emotion/react'
import useAuth from '../../hooks/useAuth'
import media from '../../lib/styles/media'
import Icon from '../Icon'

export type MobileHeaderProps = {}

function MobileHeader({}: MobileHeaderProps) {
  const { logout } = useAuth()

  return (
    <header css={HeaderWrapperStyle}>
      <div className="logo">📖 Central Book</div>
      <div onClick={() => logout()} css={LogoutButton}>
        <Icon name="logout" style={{ color: 'white', cursor: 'pointer' }} />
      </div>
    </header>
  )
}

const HeaderWrapperStyle = css`
  display: none;
  width: 100%;
  padding: 2rem;
  background-color: #4dd0e1;
  color: white;
  box-shadow: rgb(0 0 0 / 10%) 3px 4px 8px 0px;
  position: relative;

  .logo {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  ${media.medium} {
    display: block;
    /* justify-content: center;
    align-items: center; */
  }
`

const LogoutButton = css`
  position: absolute;
  right: 3em;
  top: 2.5rem;

  svg {
    color: white;
  }
`

export default MobileHeader
