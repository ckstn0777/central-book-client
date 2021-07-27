import { css } from '@emotion/react'
import { useUserState } from '../../atoms/authState'
import media from '../../lib/styles/media'
import SidebarMenuItem from '../SidebarMenu/SidebarMenuItem'

export type MobileFooterProps = {}

function MobileFooter({}: MobileFooterProps) {
  const [user] = useUserState()

  return (
    <footer css={FooterWrapperStyle}>
      <SidebarMenuItem
        css={SidebarMenuItemStyle}
        name="book"
        to={`/@${user?.username}/shelve`}
        text="내책장"
        active={`/@${user?.username}`}
        //active={[`/@${user?.username}/shelve/`, `/@${user?.username}/setting/`]}
      />
      <SidebarMenuItem
        css={SidebarMenuItemStyle}
        name="explore"
        to="/explore"
        text="만남의광장"
        active={'/explore'}

        //active={['/explore']}
      />
      <SidebarMenuItem
        css={SidebarMenuItemStyle}
        name="chart"
        to="/chart"
        text="통계분석"
        active={'/chart'}
        //active={['/chart']}
      />
    </footer>
  )
}

const FooterWrapperStyle = css`
  display: none;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 7rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;

  ${media.medium} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
  }
`

const SidebarMenuItemStyle = css`
  height: 100%;
  flex-direction: column;
  justify-content: center;

  &.active {
    background-color: white;
  }
`

export default MobileFooter
