import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import palette from '../../lib/palette'
import Button from '../Button'
import Header from '../Header'
import Modal from './Modal'
import { noimage } from '../../assets/images'
import BookSection from '../LabelSection/BookSection'
import {
  useBookInfoResetState,
  useCreateBookReviewState,
} from '../../atoms/createBookReviewState'
import { useMutation } from 'react-query'
import createBookReview from '../../lib/api/book/createBookReview'
import { BookReviewType } from '../../types/BookReview'
import { useBookShelveIdState } from '../../atoms/bookShelveState'
import { toast } from 'react-toastify'
import { BookInShelveStateActions } from '../../atoms/bookInShelveState'
import media from '../../lib/styles/media'
import { useSetBookCntState } from '../../atoms/profileState'
import logger from '../../lib/logger'

export type AddBookModalProps = {
  visible: boolean
  onClose(): void
}

function AddBookModal({ visible, onClose }: AddBookModalProps) {
  const bookCnt = useSetBookCntState()
  const [bookReview] = useCreateBookReviewState()
  const [bookShelveId] = useBookShelveIdState()
  const reset = useBookInfoResetState()
  const mutation = useMutation<
    BookReviewType,
    unknown,
    BookReviewType,
    BookReviewType
  >(bookReview => createBookReview(bookReview))
  const { append } = BookInShelveStateActions()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...bookReview,
      bookShelveId: bookShelveId,
    })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      append(mutation.data!)
      bookCnt(prev => prev + 1)
      toast.success('🦄 도서가 추가되었습니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      logger.createBookReview()
      onClose()
    }

    if (mutation.isError) {
      toast.error(`💥도서를 저장하는데 실패했습니다.`)
      onClose()
    }
  }, [mutation, append, onClose, bookCnt])

  return (
    <Modal visible={visible} onClose={onClose}>
      <Header text="책장에 도서 추가하기📚" />
      <div css={ModalBodyStyle}>
        <div css={ImageWrapper}>
          <img
            src={bookReview.bookInfo?.image_url || noimage}
            alt="book thumnail"
          />
        </div>
        <BookSection />
      </div>
      <div css={ButtonWrapper}>
        <Button text="Save" onClick={onSubmit} />
        <Button text="Cancel" fill={false} onClick={onClose} />
      </div>
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

  img {
    width: 15rem;
    height: 100%;
    object-fit: contain;
  }

  ${media.xlarge} {
    display: flex;
    justify-content: center;
    height: 20rem;
    margin: 0rem;
    padding: 1rem;
  }
`

const ButtonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 1rem;
  }
`

export default React.memo(AddBookModal)
