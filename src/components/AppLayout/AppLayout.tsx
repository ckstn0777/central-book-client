import { css } from '@emotion/react'
import SidebarMenu from '../SidebarMenu'
import Icon from '../Icon'
import media from '../../lib/styles/media'

//////////////////////////////////////////////////////////
export type AppLayoutProps = {
  children?: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return <div css={AppLayoutStyle}>{children}</div>
}

//////////////////////////////////////////////////////////
export type SidebarProps = {
  logout(): void
}

function Sidebar({ logout }: SidebarProps) {
  return (
    <aside css={SidebarStyle}>
      <div className="logo">📖 Central Book</div>
      <SidebarMenu />
      {/* <img src={woongin} alt="woongin" css={WoonginStyle} /> */}
      <div onClick={logout}>
        {/* <span>로그아웃</span> */}
        <Icon name="logout" style={{ width: '100%', cursor: 'pointer' }} />
      </div>
    </aside>
  )
}

//////////////////////////////////////////////////////////
export type MainProps = {
  children?: React.ReactNode
}

function Main({ children }: MainProps) {
  return <main css={MainStyle}>{children}</main>
}

//////////////////////////////////////////////////////////
AppLayout.Sidebar = Sidebar
AppLayout.Main = Main

//////////////////////////////////////////////////////////
const AppLayoutStyle = css`
  display: flex;

  ${media.medium} {
    margin-bottom: 7rem;
    flex-direction: column;
  }
`
const SidebarStyle = css`
  position: relative;
  width: 20rem;
  min-height: 100vh;
  padding: 3rem 1rem;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.xlarge} {
    padding: 2rem 0rem;
  }

  ${media.medium} {
    display: none;
  }

  .logo {
    font-size: 1.7rem;
    font-weight: bold;
    text-align: center;
  }
`

const MainStyle = css`
  width: calc(100% - 20rem);

  ${media.medium} {
    width: 100%;
  }
`

export default AppLayout
