import { css } from '@emotion/react'
import palette from '../../lib/palette'
import Header from '../Header'
import ProfileModifyButton from './ProfileModifyButton'
import Icon from '../Icon'
import { useCallback, useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { noimage } from '../../assets/images'
import useMyProfile from '../../hooks/useMyProfile'
import Button from '../Button'
import Modal from '../Modal'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import createFollow from '../../lib/api/follow/createFollow'
import { toast } from 'react-toastify'
import { useFollowerActions } from '../../atoms/profileState'
import { User } from '../../lib/api/types'
import deleteFollow from '../../lib/api/follow/deleteFollow'
import FollowModal from '../Modal/FollowModal'
import ProfileAlarmButton from './ProfileAlarmButton'

export type ProfileProps = {
  pathUsername: string
  user?: User | null
}

function Profile({ pathUsername, user }: ProfileProps) {
  const [modalMode, setModalMode] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [alarmVisible, setAlarmVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const alarmRef = useRef<HTMLDivElement>(null)

  const { profile, loadProfile } = useMyProfile()
  const { append, removeFollower } = useFollowerActions()
  const createFollowMutation = useMutation<number, unknown, number>(
    following_id => createFollow(following_id)
  )
  const deleteFollowMutation = useMutation<number, unknown, number>(
    following_id => deleteFollow(following_id)
  )

  const onModalClose = () => {
    setShowModal(false)
  }

  useOnClickOutside(ref, () => setVisible(false))
  useOnClickOutside(alarmRef, () => setAlarmVisible(false))

  useEffect(() => {
    loadProfile(pathUsername)
  }, [loadProfile, pathUsername])

  const onFollowHandle = useCallback(
    (id: number) => {
      createFollowMutation.mutate(id)
    },
    [createFollowMutation]
  )

  const onDeleteFollowHandle = useCallback(
    (id: number) => {
      deleteFollowMutation.mutate(id)
    },
    [deleteFollowMutation]
  )

  useEffect(() => {
    if (createFollowMutation.isSuccess) {
      toast.success('팔로우 되었습니다.')
      append({
        user_id: user?.id!,
        user_photo_url: user?.photo_url!,
        user_username: user?.username!,
        user_display_name: user?.display_name!,
      })
      createFollowMutation.reset()
    }

    if (deleteFollowMutation.isSuccess) {
      toast.success('팔로잉을 취소하였습니다.')
      removeFollower(user?.id!)
      deleteFollowMutation.reset()
    }
  }, [createFollowMutation, deleteFollowMutation, removeFollower, append, user])

  return (
    <div css={ProfileStyle}>
      <section>
        <div className="header-box">
          <Header
            text="나의 프로필"
            css={css`
              font-size: 1.4rem;
            `}
          />
          <div>
            <Icon
              name="alarm"
              onClick={() => {
                setAlarmVisible(!alarmVisible)
                setVisible(false)
              }}
              style={{ marginRight: '10px' }}
            />
            <Icon
              name="menu"
              onClick={() => {
                setVisible(!visible)
                setAlarmVisible(false)
              }}
            />
          </div>

          {alarmVisible && (
            <ProfileAlarmButton visible={alarmVisible} ref={alarmRef} />
          )}
          <ProfileModifyButton visible={visible} ref={ref} />
        </div>
        <div css={MyProfileStyle(user?.username !== pathUsername.slice(1))}>
          <div className="profile-header">
            <div className="profile">
              <img src={profile?.profile?.photo_url} alt="avatar" />
              <span>{profile?.profile?.display_name}</span>
            </div>
            <div className="follow-box">
              <p
                className="follow-number"
                onClick={() => {
                  setShowModal(true)
                  setModalMode('팔로워')
                }}
              >
                {profile.follower.length}
              </p>
              <p className="follow-span">팔로워</p>
              <p
                className="follow-number"
                onClick={() => {
                  setShowModal(true)
                  setModalMode('팔로우')
                }}
              >
                {profile.following.length}
              </p>
              <p className="follow-span">팔로우</p>
              {profile.follower
                .map(follower => follower.user_username)
                .includes(user?.username!) ? (
                <Button
                  text="팔로잉"
                  fill={false}
                  onClick={() => onDeleteFollowHandle(profile.profile.id)}
                />
              ) : (
                <Button
                  text="팔로우"
                  onClick={() => onFollowHandle(profile.profile.id)}
                />
              )}
            </div>
          </div>

          <p>{profile?.profile.information}</p>
        </div>
      </section>
      <section css={MiddleWrapper}>
        <div className="block">
          <Icon name="book" />
          <p>{profile?.book_cnt} 권</p>
          <p>내가 읽은 책</p>
        </div>
        <div className="block">
          <Icon name="star" />
          <p>{profile?.favorite_book_category}</p>
          <p>관심 있어하는 분야</p>
        </div>
      </section>
      <section>
        <div className="header-box">
          <Header
            text="가장좋아하는 도서"
            css={css`
              font-size: 1.4rem;
            `}
          />
        </div>
        <div css={FavoriteBookWrapper}>
          <img
            src={profile?.favorite_book.book_image_url ?? noimage}
            alt="book thumnail"
          />
          <p>{profile?.favorite_book.favorite_book_recommend}</p>
        </div>
      </section>
      <FollowModal
        modalMode={modalMode}
        showModal={showModal}
        onClose={onModalClose}
        profile={profile}
      />
    </div>
  )
}

const ProfileStyle = css`
  position: relative;

  flex-basis: 20%;
  height: 100vh;
  padding: 3rem 1rem;
  background-color: ${palette.amber[50]};

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .header-box {
    padding-left: 1rem;
    margin-bottom: 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      cursor: pointer;
      margin-bottom: 1rem;
      &:hover {
        color: ${palette.blueGrey[300]};
      }
    }
  }
`

const MyProfileStyle = (buttonVisible: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .profile-header {
    display: flex;

    .profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .follow-box {
      padding: 1rem 1rem;

      .follow-number {
        font-weight: 700;
        font-size: 1.2rem;
        text-align: center;
        cursor: pointer;
      }

      .follow-span {
        font-size: 1.1rem;
        color: ${palette.blueGrey[400]};
        margin-bottom: 0.75rem;
        text-align: center;
      }

      button {
        display: none;

        ${buttonVisible &&
        css`
          display: block;
        `}
        width: 100%;
        padding: 6px 6px;
        border-radius: 5px;

        span {
          margin: 0;
          font-size: 1rem;
          font-family: sans-serif;
          letter-spacing: 0;
        }
      }
    }
  }

  img {
    object-fit: cover;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
  }

  span {
    font-family: 'Jua', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 3px;
    margin: 1rem 0;
  }
`

const MiddleWrapper = css`
  display: flex;
  justify-content: space-around;
  height: 18rem;
  margin: 2rem 0;

  .block {
    background-color: ${palette.blueGrey[50]};
    flex-basis: 45%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
  }
`

const FavoriteBookWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    object-fit: contain;
    width: 12rem;
    height: 12rem;
    margin: 1rem 0 2rem;
  }
`

export default Profile
