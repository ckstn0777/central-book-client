import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import {
  useBookInShelveLoadingState,
  useBookInShelveOrderState,
} from '../../atoms/bookInShelveState'
import palette from '../../lib/palette'
import useBookInShelve from '../../hooks/useBookInShelve'
import Icon from '../Icon'
import media from '../../lib/styles/media'
import Spinner from '../Spinner'
import { noimage } from '../../assets/images'

export type BookInShelveListProps = {
  isMine: boolean
  onChangeOpenBookModal(
    exist: boolean,
    bookId: number,
    idx: number,
    isMine: boolean
  ): void
}

function BookInShelveList({
  isMine,
  onChangeOpenBookModal,
}: BookInShelveListProps) {
  const bookInShelve = useBookInShelveOrderState()
  const isLoading = useBookInShelveLoadingState()
  const onLoadBookInShelve = useBookInShelve()

  useEffect(() => {
    onLoadBookInShelve()
  }, [onLoadBookInShelve])

  if (isLoading) {
    return (
      <div css={fullPageSpinner}>
        <Spinner size="10rem" />
      </div>
    )
  }

  return (
    <div css={wrapper}>
      {bookInShelve?.map((book, idx) => (
        <div
          key={idx}
          css={gridItemStyle}
          onClick={() => {
            onChangeOpenBookModal(
              book ? true : false,
              book?.bookInfo?.id!,
              idx,
              isMine
            )
          }}
        >
          {book ? (
            <div css={bookInShelveStyle}>
              <img
                src={book?.bookInfo?.image_url || noimage}
                alt="book thumnail"
              />
              {/* <StarRadioButton ratings={book?.ratings} /> */}
            </div>
          ) : (
            isMine && (
              <div css={EmptyBookStyle}>
                <Icon name="plus" />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  )
}

const wrapper = css`
  flex: 1;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, minmax(min-content, 1fr));
  grid-gap: 1rem;

  padding: 2rem;
  background-color: white;

  ${media.small} {
    padding: 0;
    grid-template-columns: repeat(4, minmax(min-content, 1fr));
  }

  ${media.xsmall} {
    grid-template-columns: repeat(3, minmax(min-content, 1fr));
  }
`

const gridItemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 0.275rem;
  background-color: ${palette.blueGrey[200]};

  ${media.small} {
    min-height: 13rem;
  }

  &:hover {
    cursor: pointer;
    background-color: ${palette.blueGrey[100]};
  }
`

const bookInShelveStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 25px;

  img {
    width: 11rem;
    height: 15rem;
    object-fit: contain;
    /* margin-bottom: -1rem; */

    ${media.small} {
      width: 9rem;
      height: 12rem;
    }

    ${media.xsmall} {
      width: 7rem;
      height: 10rem;
    }
  }
`

const EmptyBookStyle = css`
  background: rgba(215, 215, 215, 0.38);
  width: 9rem;
  height: 11rem;

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${palette.blueGrey[500]};
  }

  ${media.xsmall} {
    width: 6rem;
  }
`

const fullPageSpinner = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 90%;
`

export default BookInShelveList
