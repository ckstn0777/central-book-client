import { css } from '@emotion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce/lib'
import LabelSection from '.'
import {
  useBookInfoState,
  useCreateBookReviewState,
} from '../../atoms/createBookReviewState'
import useSearchQuery from '../../hooks/query/useSearchQuery'
import getBookInfo from '../../lib/api/book/getBookInfo'
import media from '../../lib/styles/media'
import AutoComplete from '../AutoComplete'
import Input from '../Input'
import TextAreaInput from '../Input/TextAreaInput'
import StarRadioButton from '../StarRadioButton'

export type BookSectionProps = {}

function BookSection({}: BookSectionProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    []
  )

  const [bookReview, setBookReview] = useCreateBookReviewState()
  const onReviewChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBookReview(prev => ({ ...prev, review: e.target.value }))
    },
    [setBookReview]
  )

  const [debounceTitle] = useDebounce(title, 500)
  const { results, isLoading, goUp, goDown, selectedIndex } =
    useSearchQuery(debounceTitle)

  const [bookInfo, setBookInfo] = useBookInfoState()
  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return

      e.preventDefault()
      if (e.key === 'ArrowDown') {
        goDown()
      } else if (e.key === 'ArrowUp') {
        goUp()
      } else if (e.key === 'Enter') {
        if (selectedIndex === -1 || !results || results?.length === 0) {
          return
        }
        const data = await getBookInfo(
          results[selectedIndex].isbn,
          results[selectedIndex].title
        )
        setBookInfo({ ...results[selectedIndex], ...data })
        setTitle(results[selectedIndex].title)
        setOpen(false)
      }
    },
    [goDown, goUp, selectedIndex, results, setBookInfo]
  )

  const onMouseClick = useCallback(
    async selectedIndex => {
      if (selectedIndex === -1 || !results || results?.length === 0) {
        return
      }
      const data = await getBookInfo(
        results[selectedIndex].isbn,
        results[selectedIndex].title
      )
      setBookInfo({ ...results[selectedIndex], ...data })
      setTitle(results[selectedIndex].title)
      setOpen(false)
    },
    [results, setBookInfo]
  )

  useEffect(() => {
    if (title.length === 0) {
      setBookInfo(null)
      setOpen(false)
    }
  }, [title, setBookInfo])

  useEffect(() => {
    if (title.length > 0 && results && !bookInfo) {
      setOpen(true)
    }
  }, [results, bookInfo, title])

  return (
    <div css={wrapper}>
      <div css={LabelSectionGroupStyle}>
        <LabelSection text="책 이름">
          <Input
            css={InputWrpper}
            type="text"
            value={title}
            placeholder="도서를 입력해주세요"
            onChange={onTitleChange}
            onKeyDown={onKeyDown}
          >
            {open && (
              <AutoComplete
                books={results}
                selectedIndex={selectedIndex}
                onMouseClick={onMouseClick}
                isLoading={isLoading}
              />
            )}
          </Input>
        </LabelSection>
        <LabelSection text="별점">
          <StarRadioButton />
        </LabelSection>
        <LabelSection text="후기" css={reviewLabelSection}>
          <TextAreaInput css={InputWrpper} onChange={onReviewChange}>
            <div>{`${bookReview.review.length}/500자`}</div>
          </TextAreaInput>
        </LabelSection>
      </div>
    </div>
  )
}

const wrapper = css`
  flex: 1;
  padding: 1rem 2rem;

  ${media.large} {
    padding: 1rem 0 0;
  }
`

const LabelSectionGroupStyle = css`
  padding-left: 2rem;
  padding-right: 2rem;
  justify-content: unset;

  ${media.large} {
    padding-left: 0;
    padding-right: 0;
  }
`

const InputWrpper = css`
  flex: 1;
`

const reviewLabelSection = css`
  /* display: flex; */
  /* flex-direction: column; */
`

export default BookSection
