import { css } from '@emotion/react'
import React, { forwardRef } from 'react'
import { useTransition, animated } from 'react-spring'
import palette from '../../lib/palette'
import userStorage from '../../lib/storage/userStorage'
import SidebarMenuItem from '../SidebarMenu/SidebarMenuItem'

export type ProfileModifyButtonProps = {
  visible: boolean
} & React.HTMLAttributes<HTMLDivElement>

function ProfileModifyButton(
  { visible }: ProfileModifyButtonProps,
  ref: React.Ref<HTMLDivElement>
) {
  const transition = useTransition(visible, {
    from: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
  })
  const user = userStorage.get()

  return transition((props, item) =>
    item ? (
      <animated.div
        css={block}
        style={{
          opacity: props.opacity,
          transform: props.transform,
        }}
        ref={ref}
      >
        <ul>
          <SidebarMenuItem
            to={`/@${user?.username}/setting`}
            text="프로필 수정"
          />
          <li>팔로우 관리</li>
          <li>서비스정책</li>
        </ul>
      </animated.div>
    ) : null
  )
}

const block = css`
  position: absolute;
  top: 5rem;
  right: 2rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;

  width: 10rem;
  background-color: white;

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  li {
    font-size: 1rem;
    padding: 0.8rem 1rem;
    cursor: pointer;

    &:hover {
      background-color: ${palette.blueGrey[50]};
    }
  }

  li + li {
    border-top: 1px solid ${palette.blueGrey[200]};
  }
`

export default forwardRef<HTMLDivElement, ProfileModifyButtonProps>(
  ProfileModifyButton
)
