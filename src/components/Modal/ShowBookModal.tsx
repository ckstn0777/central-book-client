import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '.'
import { noimage } from '../../assets/images'
import {
  BookInShelveStateActions,
  useBookInShelveSelectState,
} from '../../atoms/bookInShelveState'
import { useSetBookCntState } from '../../atoms/profileState'
import deleteBookReview from '../../lib/api/book/deleteBookReview'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Button from '../Button'
import Dialog from '../Dialog'
import Header from '../Header'
import LabelSection from '../LabelSection'
import StarRadioButton from '../StarRadioButton'

export type ShowBookModalProps = {
  bookId: number
  visible: boolean
  isMine: boolean
  onClose(): void
}

function ShowBookModal({
  bookId,
  visible,
  isMine,
  onClose,
}: ShowBookModalProps) {
  const selectedBook = useBookInShelveSelectState(bookId)
  const bookCnt = useSetBookCntState()
  const [showDialog, setShowDialog] = useState(false)
  const mutation = useMutation<any, unknown, number>(reviewId =>
    deleteBookReview(reviewId)
  )
  const { remove } = BookInShelveStateActions()

  const onRemove = useCallback(() => {
    mutation.mutate(selectedBook!.id)
  }, [mutation, selectedBook])

  useEffect(() => {
    if (mutation.isSuccess) {
      remove(selectedBook!.id)
      toast.success('πμ±κ³΅μ μΌλ‘ μ­μ λμμ΅λλ€.')
      bookCnt(prev => prev - 1)
      mutation.reset()
      setShowDialog(false)
      onClose()
    }
    if (mutation.isError) {
      toast.error('π¨μ­μ νλλ° μ€ν¨νμμ΅λλ€.')
    }
  }, [mutation, remove, selectedBook, setShowDialog, onClose, bookCnt])

  useEffect(() => {
    return () => {
      onClose()
    }
  }, [onClose])

  return (
    <Modal visible={visible} onClose={onClose}>
      <Header text="μ±μ₯ μ λμ μμΈλ³΄κΈ°π" />
      <div css={ModalBodyStyle}>
        <Link
          css={ImageWrapper}
          to={`/explore/book/${selectedBook?.bookInfo!.id!}`}
        >
          <img
            src={selectedBook?.bookInfo?.image_url || noimage}
            alt="book thumnail"
          />
        </Link>
        <div css={wrapper}>
          <div css={LabelSectionGroupStyle}>
            <LabelSection text="μ± μ΄λ¦">
              {selectedBook?.bookInfo?.title}
            </LabelSection>
            <LabelSection text="λ³μ ">
              <StarRadioButton ratings={selectedBook?.ratings} />
            </LabelSection>
            {/* <LabelSection text="νκΈ°">{selectedBook?.review}</LabelSection> */}
            <LabelSection text="νκΈ°">
              <div style={{ width: '82.5%' }}>
                {selectedBook?.review.split('\n').map(line => {
                  return (
                    <span>
                      {line}
                      <br />
                    </span>
                  )
                })}
              </div>
            </LabelSection>
            <LabelSection text="μ±μ₯μ μΆκ°ν μ¬λλ€" css={ShareLabelSection}>
              {selectedBook?.user ? (
                selectedBook.user.map(user => (
                  <Link
                    className="share-user"
                    to={`/@${user.username}/shelve`}
                    key={user.username}
                  >
                    <img src={user.photo_url} alt="user" />
                    <div className="tooltip">{user.username}</div>
                  </Link>
                ))
              ) : (
                <div>πμμ΅λλ€γ γ </div>
              )}
            </LabelSection>
          </div>
        </div>
        {/* <BookSection /> */}
      </div>

      {isMine && (
        <div css={ButtonWrapper}>
          <Button text="μμ νκΈ°" />
          <Button
            text="μ­μ νκΈ°"
            fill={false}
            onClick={() => setShowDialog(true)}
          />
        </div>
      )}
      <Dialog
        visible={showDialog}
        title="π¨μ­μ νκΈ°"
        message="μ λ§λ‘ μ­μ νμκ² μ΅λκΉ?"
        onCancel={() => setShowDialog(false)}
        onConfirm={onRemove}
      />
    </Modal>
  )
}

const ModalBodyStyle = css`
  display: flex;
  padding: 1rem;

  ${media.xlarge} {
    flex-direction: column;
  }
`

const ImageWrapper = css`
  height: 25rem;
  padding: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid ${palette.blueGrey[200]};
  cursor: pointer;

  img {
    width: 15rem;
    height: 100%;
    object-fit: contain;
  }

  ${media.xlarge} {
    display: flex;
    justify-content: center;
    margin: 2rem;
  }
`

const ButtonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;

  flex: 1;
  align-items: flex-end;

  button + button {
    margin-left: 1rem;
  }
`

const wrapper = css`
  flex: 1;
  padding: 1rem 2rem;
`

const LabelSectionGroupStyle = css`
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: unset;

  ${media.medium} {
    padding: 0;
  }
`

const ShareLabelSection = css`
  margin-top: 3rem;
  span {
    width: 15rem !important;
  }
  .share-user {
    position: relative;
    cursor: pointer;

    &:hover {
      .tooltip {
        display: block;
      }
    }

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
      margin-left: 0.5rem;
    }
    .tooltip {
      display: none;
      position: absolute;
      top: -3rem;
      left: -1rem;
      background-color: ${palette.blueGrey[50]};
      border-radius: 10px;
      padding: 0.5rem;
    }
  }
`

export default ShowBookModal
