import { NavLink, Link } from 'react-router-dom'
import { css } from '@emotion/react'
import Icon from '../Icon'
import { IconNameType } from '../Icon/Icon'
import palette, { brandColor } from '../../lib/palette'

export type SidebarMenuItemProps = {
  to: string
  text: string
  active?: string
  name?: IconNameType
  className?: string
}

export function SidebarMenuItem({
  to,
  text,
  active,
  name,
  className,
}: SidebarMenuItemProps) {
  return (
    <li>
      {active ? (
        <NavLink
          to={to}
          css={name && SidebarMenuItemStyle}
          className={className}
          isActive={(match, location) => {
            // return active.includes(location.pathname)
            return location.pathname.includes(active)
          }}
        >
          {name && (
            <Icon name={name} style={{ flexBasis: '30%', display: 'flex' }} />
          )}
          <span>{text}</span>
        </NavLink>
      ) : (
        <Link to={to} css={name && SidebarMenuItemStyle} className={className}>
          <span>{text}</span>
        </Link>
      )}
    </li>
  )
}

const SidebarMenuItemStyle = css`
  display: flex;
  align-items: center;

  height: 3rem;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;

  font-family: 'Jua', sans-serif;
  font-size: 1.3rem;

  &.active,
  &:hover {
    background-color: ${palette.blueGrey[50]};
  }

  &.active > * {
    color: ${brandColor};
  }
`
export default SidebarMenuItem
