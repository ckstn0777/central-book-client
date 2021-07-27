import { css } from '@emotion/react'
import { useRef } from 'react'
import { SearchBookResult } from '../../lib/api/book/searchBook'
import palette from '../../lib/palette'
import Spinner from '../Spinner'

export type AutoCompleteItemProps = {
  book: SearchBookResult
  selected: boolean
  idx: number
  onMouseClick: (selectedIndex: any) => Promise<void>
}

function AutoCompleteItem({
  book,
  selected,
  idx,
  onMouseClick,
}: AutoCompleteItemProps) {
  const ref = useRef<null | HTMLDivElement>(null)

  if (selected) {
    ref.current?.scrollIntoView()
  }

  return (
    <div
      css={ItemWrapper(selected)}
      ref={ref}
      onMouseDown={() => onMouseClick(idx)}
    >
      <div>
        <p>
          책 제목 : <b>{book.title}</b>
        </p>
        <p>작가 : {book.author}</p>
        <p>출판사 : {book.publisher}</p>
        <p>출판일 : {book.pub_date}</p>
      </div>
    </div>
  )
}

const ItemWrapper = (selected: boolean) => css`
  display: flex;
  padding: 1rem;

  & + & {
    border-top: 1px solid ${palette.blueGrey[200]};
  }

  &:hover {
    cursor: pointer;
    background-color: ${palette.blueGrey[50]};
  }

  ${selected &&
  css`
    background-color: ${palette.blueGrey[50]};
  `}
`

/////////////////////////////////////////////////
export type AutoCompleteProps = {
  books: SearchBookResult[] | null
  selectedIndex: number
  onMouseClick: (selectedIndex: any) => Promise<void>
  isLoading: boolean
}

function AutoComplete({
  books,
  selectedIndex,
  onMouseClick,
  isLoading,
}: AutoCompleteProps) {
  if (!books || books.length === 0) return null

  if (isLoading) {
    return (
      <div css={AutoCompleteStyle(isLoading)}>
        <Spinner size="10rem" />
      </div>
    )
  }

  return (
    <div css={AutoCompleteStyle()}>
      {books?.map((book, i) => (
        <AutoCompleteItem
          key={book.id}
          book={book}
          selected={i === selectedIndex}
          onMouseClick={onMouseClick}
          idx={i}
        />
      ))}
    </div>
  )
}

const AutoCompleteStyle = (isLoading?: boolean) => css`
  position: absolute;
  top: 3.5rem;

  width: 100%;
  height: 20rem;
  background-color: white;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
  z-index: 999;
  overflow-y: auto;

  ${isLoading &&
  css`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      position: relative;
      top: 0rem;
      right: 0rem;
    }
  `}
`

// const fullPageSpinner = css`

// `

export default AutoComplete
