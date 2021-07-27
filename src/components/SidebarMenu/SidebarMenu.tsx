import { css } from '@emotion/react'
import { useUserState } from '../../atoms/authState'
import SidebarItem from './SidebarMenuItem'

export type SidebarMenuProps = {}

export function SidebarMenu({}: SidebarMenuProps) {
  const [user] = useUserState()

  return (
    <ul css={SidebarMenuStyle}>
      <SidebarItem
        name="book"
        to={`/@${user?.username}/shelve`}
        active={`/@${user?.username}`}
        text="내책장"
      />
      <SidebarItem
        name="explore"
        to="/explore"
        active={'/explore'}
        text="만남의광장"
      />
      <SidebarItem name="chart" to="/chart" active={'/chart'} text="통계분석" />
    </ul>
  )
}

const SidebarMenuStyle = css`
  list-style: none;
  margin-top: 2rem;
  margin-bottom: 2rem;

  flex: 1;
`

export default SidebarMenu
