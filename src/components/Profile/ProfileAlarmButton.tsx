import { css } from '@emotion/react'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTransition, animated } from 'react-spring'
import getAlarmData, { AlarmResult } from '../../lib/api/me/getAlarmData'
import dateFormat from '../../lib/dateFormat'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Header from '../Header'
import Icon from '../Icon'
import Spinner from '../Spinner'

export type ProfileAlarmButtonProps = {
  visible: boolean
} & React.HTMLAttributes<HTMLDivElement>

function ProfileAlarmButton(
  { visible }: ProfileAlarmButtonProps,
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
  const [alarms, setAlarms] = useState<AlarmResult[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    getAlarmData().then(data => {
      setAlarms(data)
      setIsLoading(false)
    })
  }, [])

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
        <div css={HeaderStyle}>
          <Header text="알림" />
          <Icon name="settings" />
        </div>

        <ul>
          {isLoading ? (
            <div css={fullPageSpinner}>
              <Spinner size="10rem" />
            </div>
          ) : (
            alarms?.map((alarm, idx) => (
              <li key={idx}>
                <img
                  src={alarm.user_photo_url}
                  alt="avatar"
                  className="avatar"
                />
                <div className="text-box">
                  <p>
                    {alarm.user_display_name}님이 {alarm.book_title}을
                    추가하셨습니다.
                  </p>
                  <p className="text-time">
                    {dateFormat(new Date(alarm.alarm_create_at))}
                  </p>
                </div>
                <img
                  src={alarm.book_image_url}
                  alt="book thumnail"
                  className="book"
                />
              </li>
            ))
          )}
        </ul>
      </animated.div>
    ) : null
  )
}

const block = css`
  position: absolute;
  top: 5rem;
  right: 4rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;

  width: 40rem;
  background-color: white;
  z-index: 9999;

  ${media.xsmall} {
    width: 30rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    max-height: 39rem;
    overflow-y: scroll;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1rem;
    padding: 0.8rem 1rem;
    cursor: pointer;

    .avatar {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
      ${media.xsmall} {
        display: none;
      }
    }

    .text-box {
      padding: 0 1rem;
      .text-time {
        color: ${palette.blueGrey[300]};
        margin-top: 5px;
      }
    }

    .book {
      width: 10rem;
      height: 7rem;
      object-fit: contain;
      ${media.xsmall} {
        display: none;
      }
    }

    &:hover {
      background-color: ${palette.blueGrey[50]};
    }
  }

  /* li + li {
    border-top: 1px solid ${palette.blueGrey[200]};
  } */
`

const HeaderStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${palette.blueGrey[200]};

  h2 {
    flex: 1;
    padding: 1rem 1.5rem;
    margin: 0;
  }

  svg {
    margin: 0;
    margin-top: 0.75rem;
    margin-right: 1rem;
  }
`

const fullPageSpinner = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 90%;
`

export default forwardRef<HTMLDivElement, ProfileAlarmButtonProps>(
  ProfileAlarmButton
)
