import { css } from '@emotion/react'
import Button from '../Button'
import Header from '../Header'
import ImageUpload from '../ImageUpload'
import Modal from './Modal'
import BookShelveSection from '../LabelSection/BookShelveSection'
import { useMutation } from 'react-query'
import createShelve from '../../lib/api/shelve/createShelve'
import {
  useSetBookShelveResetState,
  useSetBookShelveState,
} from '../../atoms/createBookShelveState'
import { useBookShelveActions } from '../../atoms/bookShelveState'
import { BookShelve } from '../../types/BookShelve'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import media from '../../lib/styles/media'
import logger from '../../lib/logger'

export type AddBookShelveModalProps = {
  visible: boolean
  onClose(): void
}

function AddBookShelveModal({ visible, onClose }: AddBookShelveModalProps) {
  const mutation = useMutation<BookShelve, unknown, FormData>(formData =>
    createShelve(formData)
  )
  const [bookShelve] = useSetBookShelveState()
  const reset = useSetBookShelveResetState()
  const { append } = useBookShelveActions()

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const { name, style, color, image_url } = bookShelve
    if (name === '' || color === '') {
      toast.error('필수값을 입력해주세요')
      return
    }

    const formData = new FormData()
    formData.append('image', image_url.raw!)
    formData.append('name', name)
    formData.append('color', color)
    formData.append('style', style)

    mutation.mutate(formData)
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      append(mutation.data!)
      toast.success('🦄 책장이 추가되었습니다', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      logger.createBookShelve()
      onClose()
    }

    if (mutation.isError) {
      toast.error(`Don't save book shelve`)
      onClose()
    }
  }, [mutation, append, onClose])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <Modal visible={visible} onClose={onClose}>
      <Header text="내 책장 추가하기🎁" />
      <div css={ModalBodyStyle}>
        <ImageUpload />
        <BookShelveSection />
      </div>
      <div css={ButtonWrapper}>
        <Button text="Save" onClick={handleSubmit} />
        <Button text="Cancel" fill={false} onClick={onClose} />
      </div>
    </Modal>
  )
}

const ModalBodyStyle = css`
  display: flex;
  padding: 1rem;

  ${media.medium} {
    flex-direction: column;
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

export default AddBookShelveModal
