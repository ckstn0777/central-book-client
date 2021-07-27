import { css } from '@emotion/react'
import { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '.'
import { ProfileResult, useFollowerActions } from '../../atoms/profileState'
import createFollow from '../../lib/api/follow/createFollow'
import deleteFollow from '../../lib/api/follow/deleteFollow'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Button from '../Button'
import Header from '../Header'

export type FollowModalProps = {
  modalMode: string | null
  showModal: boolean
  onClose(): void
  profile: ProfileResult
}

function FollowModal({
  modalMode,
  showModal,
  onClose,
  profile,
}: FollowModalProps) {
  const { append, removeFollowing } = useFollowerActions()
  const history = useHistory()

  const deleteFollowMutation = useMutation<number, unknown, number>(
    following_id => deleteFollow(following_id)
  )

  const onDeleteFollowHandle = useCallback(
    (id: number) => {
      deleteFollowMutation.mutate(id)
    },
    [deleteFollowMutation]
  )

  useEffect(() => {
    if (deleteFollowMutation.isSuccess) {
      toast.success('팔로잉을 취소하였습니다.')
      removeFollowing(deleteFollowMutation.data!)
      deleteFollowMutation.reset()
    }
  }, [deleteFollowMutation, removeFollowing, append])

  useEffect(() => {
    history.listen(() => onClose())
  }, [history, onClose])

  return (
    <Modal visible={showModal} onClose={onClose} css={FollowModalWrapper}>
      <Header text={`${modalMode}`} />
      {modalMode === '팔로워'
        ? profile.follower.map(follower => (
            <div className="follower-box" key={follower.user_id}>
              <img src={follower.user_photo_url} alt="follower" />
              <Link
                className="follower-box__name"
                to={`/@${follower.user_username}/shelve`}
              >
                <span className="display_name">
                  {follower.user_display_name}
                </span>
                <span className="user_name">{follower.user_username}</span>
              </Link>

              {/* <Button text="삭제" width="6rem" /> */}
            </div>
          ))
        : profile.following.map(following => (
            <div className="follower-box" key={following.following_id}>
              <img src={following.user_photo_url} alt="following" />
              <Link
                className="follower-box__name"
                to={`/@${following.user_username}/shelve`}
              >
                <span className="display_name">
                  {following.user_display_name}
                </span>
                <span className="user_name">{following.user_username}</span>
              </Link>

              {/* {profile.following
                .map(following => following.user_username)
                .includes(following.user_username) ? ( */}
              <Button
                text="삭제"
                width="6rem"
                onClick={() => onDeleteFollowHandle(following.following_id)}
              />
              {/* ) : (
                <Button
                  text="팔로우"
                  onClick={() => onFollowHandle(following.following_id)}
                />
              )} */}
              {/* <Button text="팔로잉" width="8rem" fill={false} /> */}
            </div>
          ))}
    </Modal>
  )
}

const FollowModalWrapper = css`
  width: 30vw;
  min-height: 60vh;

  ${media.xlarge} {
    width: 40vw;
  }

  ${media.medium} {
    width: 50vw;
  }

  ${media.small} {
    width: 65vw;
    min-height: 70vh;
  }

  ${media.xsmall} {
    width: 85vw;
    min-height: 70vh;
  }

  h2 {
    font-size: 1.7rem;
  }

  .follower-box {
    display: flex;
    // justify-content: center;
    align-items: center;
    overflow: hidden;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;

    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
      border: 2px ${palette.red[500]} solid;
      padding: 3px;
    }

    &__name {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 2rem;

      .display_name {
        font-size: 1.3rem;
        font-weight: 700;
      }

      .user_name {
        font-size: 1.1rem;
        color: ${palette.blueGrey[400]};
      }
    }
  }
`

export default FollowModal
