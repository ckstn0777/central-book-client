import { css } from '@emotion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useBookShelve from '../../hooks/useBookShelve'
import { Drake } from 'dragula'
import reactDragula from 'react-dragula'
import 'react-dragula/dist/dragula.min.css'
import media from '../../lib/styles/media'
import { noimage } from '../../assets/images'
import {
  useBookShelveModeState,
  useSetBookShelveModeState,
} from '../../atoms/bookShelveState'
import transitions from '../../lib/styles/transitions'
import Dialog from '../Dialog'
import { useMutation } from 'react-query'
import deleteShelve from '../../lib/api/shelve/deleteShelve'
import { toast } from 'react-toastify'

export type BookShelveListProps = {
  pathUsername: string
}

function BookShelveList({ pathUsername }: BookShelveListProps) {
  const {
    bookShelve,
    bookShelveId,
    setBookShelveId,
    removeShelve,
    onLoadBookShelve,
    onBookShelveClick,
  } = useBookShelve()
  const draggableContainer = useRef<HTMLDivElement>(null)
  const [drake, setDrake] = useState<Drake | null>(null)
  const bookShelveMode = useBookShelveModeState()
  const setBookShelveMode = useSetBookShelveModeState()
  const [showModal, setShowModal] = useState(false)
  const [deleteShelveId, setDeleteShelveId] = useState<number | null>(null)
  const mutation = useMutation<any, unknown, number>(shelveId =>
    deleteShelve(shelveId)
  )

  useEffect(() => {
    onLoadBookShelve(pathUsername)
  }, [onLoadBookShelve, pathUsername])

  useEffect(() => {
    if (draggableContainer.current) {
      setDrake(
        reactDragula([draggableContainer.current], {
          direction: 'horizontal',
          revertOnSpill: true,
          moves: (_el, _container, handle) => {
            if (!handle) {
              return false
            }

            return Boolean(handle.closest('.draggable'))
          },
        })
      )
    }
  }, [])

  useEffect(() => {
    if (drake) {
      drake.on('dragend', e => {
        console.log('dragend')
      })
    }
  }, [drake])

  const onRemoveShelve = useCallback(() => {
    if (!deleteShelveId) {
      return
    }
    mutation.mutate(deleteShelveId)
    setShowModal(false)
  }, [mutation, deleteShelveId])

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('🚀성공적으로 삭제되었습니다.')
      removeShelve(deleteShelveId!)
      setBookShelveMode('default')
      // setBookShelveId(bookShelve[0]?.id || -1)
      mutation.reset()
    }
    if (mutation.isError) {
      toast.error('🚨삭제하는데 실패하였습니다.')
    }
  }, [
    mutation,
    removeShelve,
    deleteShelveId,
    setBookShelveId,
    bookShelve,
    setBookShelveMode,
  ])

  useEffect(() => {
    setBookShelveId(bookShelve[0]?.id || -1)
  }, [setBookShelveId, bookShelve])

  return (
    <div css={ShelveListStyle} ref={draggableContainer}>
      {bookShelve.map(shelve => (
        <div
          className={bookShelveMode === 'update' ? 'draggable' : ''}
          key={shelve.id}
          css={block(bookShelveId === shelve.id, bookShelveMode)}
          onClick={() => {
            if (bookShelveMode === 'update') {
              return
            }
            onBookShelveClick(shelve.id)
          }}
        >
          <img
            src={
              shelve.image_url
                ? `https://d2et5vjbr53d2l.cloudfront.net/${shelve.image_url}`
                : noimage
            }
            alt="shelve thumnail"
          />
          <div className="text-box" css={TextBoxStyle(shelve.color)}>
            <span>
              <br />
              {shelve.name}
            </span>
          </div>
          {bookShelveMode === 'update' && (
            <button
              className="delete-button"
              onClick={() => {
                setShowModal(true)
                setDeleteShelveId(shelve.id)
              }}
            >
              X
            </button>
          )}
        </div>
      ))}
      {showModal && (
        <Dialog
          visible={showModal}
          title="책장 삭제"
          message="책장을 삭제하시면 책장 안 도서 또한 전부 삭제됩니다. 정말로 삭제하시겠습니까?"
          onConfirm={() => onRemoveShelve()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

const ShelveListStyle = css`
  display: flex;
  padding: 1rem;
  cursor: grab;

  ${media.xsmall} {
    padding: 1rem 0;
  }

  // overflow-x: scroll;
`

const block = (selected: boolean, mode: string) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    // cursor: pointer;
  }

  ${selected &&
  css`
    transform: scale(1.02);
    box-shadow: rgb(0 0 0 / 47%) 0px 0px 8px 0px;
    border-radius: 15px;
  `}

  ${mode === 'update' &&
  css`
    animation: ${transitions.shake} 1s;
    animation-iteration-count: infinite;
  `}

  img {
    width: 12.5rem;
    height: 9rem;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: -3.5rem;
    z-index: 999;
  }

  .delete-button {
    position: absolute;
    top: -8px;
    right: -10px;
    z-index: 9999;

    background: #f00;
    border: 1px solid #f00;
    border-radius: 2em;
    color: white;
    display: inline-block;
    font-size: 12px;
    height: 25px;
    line-height: 2px;
    margin: 0 0 8px;
    padding: 0;
    text-align: center;
    width: 25px;

    cursor: pointer;
  }

  ${media.xsmall} {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    img {
      width: 9rem;
      height: 6rem;
      margin-bottom: -3rem;
    }
  }
`

const TextBoxStyle = (color: string) => css`
  background-color: ${color};
  color: white;
  font-size: 1.25rem;
  border-radius: 15px;

  width: 120%;
  height: 7rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.xsmall} {
    height: 6rem;
  }
`

export default BookShelveList
