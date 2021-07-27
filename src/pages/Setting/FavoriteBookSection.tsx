import { css } from '@emotion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'
import LabelSection from '../../components/LabelSection'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useFavoriteBookState } from '../../atoms/profileState'
import AutoComplete from '../../components/AutoComplete'
import { useDebounce } from 'use-debounce/lib'
import useSearchQuery from '../../hooks/query/useSearchQuery'
import { useBookInfoState } from '../../atoms/createBookReviewState'
import getBookInfo from '../../lib/api/book/getBookInfo'
import { useMutation } from 'react-query'
import updateMyProfile from '../../lib/api/me/updateMyProfile'
import Dialog from '../../components/Dialog'
import isAxiosError from '../../lib/utils/isAxiosError'
import { toast } from 'react-toastify'

export type FavoriteBookSectionProps = {}

function FavoriteBookSection({}: FavoriteBookSectionProps) {
  const [favoriteBook, setFavoriteBook] = useFavoriteBookState()
  const [updateTitle, setUpdateTitle] = useState(false)
  const [updateRecommend, setUpdateRecommend] = useState(false)

  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState(favoriteBook.book_title)
  const [recommend, setRecommend] = useState(
    favoriteBook.favorite_book_recommend
  )
  const [debounceTitle] = useDebounce(title, 500)
  const { results, isLoading, goUp, goDown, selectedIndex } =
    useSearchQuery(debounceTitle)

  const [bookInfo, setBookInfo] = useBookInfoState()
  const [isDialogVisible, setIsDialogVisible] = useState(false)

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

  const mutation = useMutation<any, unknown, any>(book => updateMyProfile(book))

  const onSubmitTitle = useCallback(() => {
    if (!title) {
      return
    }
    mutation.mutate({ type: 'book', bookInfo })
    setUpdateTitle(false)
  }, [mutation, title, bookInfo])

  const onSubmitRecommend = useCallback(() => {
    mutation.mutate({ type: 'recommend', recommend })
    setUpdateRecommend(false)
  }, [mutation, recommend])

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
    if (mutation.isSuccess) {
      setFavoriteBook(prev => ({
        ...prev,
        book_title: title,
        favorite_book_recommend: recommend,
      }))
      mutation.reset()
    }
    if (mutation.isError) {
      if (isAxiosError(mutation.error)) {
        toast.error(mutation.error.response?.data.message)
      }
      mutation.reset()
    }
  }, [mutation, setFavoriteBook, title, recommend])

  useEffect(() => {
    if (title?.length === 0) {
      setBookInfo(null)
      setOpen(false)
    }
  }, [title, setBookInfo])

  useEffect(() => {
    if (title?.length > 0 && results && !bookInfo) {
      setOpen(true)
    }
  }, [results, bookInfo, title])

  useEffect(() => {
    return () => {
      setBookInfo(null)
    }
  }, [setBookInfo])

  return (
    <div css={bookWrapper}>
      <div className="text-box">
        <LabelSection text="가장 좋아하는 도서" css={LabelSectionStyle}>
          {updateTitle ? (
            <Input
              value={title}
              placeholder="도서를 입력해주세요"
              onChange={e => setTitle(e.target.value)}
              onFocus={() => setOpen(true)}
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
          ) : (
            <span>{favoriteBook.book_title}</span>
          )}
          {updateTitle ? (
            <Button text="저장" onClick={onSubmitTitle} />
          ) : (
            <button
              className="update-btn"
              onClick={() => {
                setTitle('')
                setUpdateTitle(true)
              }}
            >
              수정
            </button>
          )}
        </LabelSection>
        <LabelSection text="좋아하는 이유" css={LabelSectionStyle}>
          {updateRecommend ? (
            <Input
              value={recommend}
              placeholder="해당 도서를 좋아하는 이유를 입력해주세요"
              onChange={e => setRecommend(e.target.value)}
            />
          ) : (
            <span>{favoriteBook.favorite_book_recommend}</span>
          )}
          {updateRecommend ? (
            <Button text="저장" onClick={onSubmitRecommend} />
          ) : (
            <button
              className="update-btn"
              onClick={() => setUpdateRecommend(true)}
            >
              수정
            </button>
          )}
        </LabelSection>
        <LabelSection text="회원탈퇴" css={LabelSectionStyle}>
          <Button text="회원탈퇴" onClick={() => setIsDialogVisible(true)} />
        </LabelSection>
      </div>
      <Dialog
        visible={isDialogVisible}
        title="회원탈퇴"
        message="탈퇴하시면 모든 정보가 삭제됩니다. 정말로 탈퇴하시겠습니까?"
        onConfirm={() => setIsDialogVisible(false)}
        onCancel={() => setIsDialogVisible(false)}
        isDestructive={true}
      />
    </div>
  )
}

const bookWrapper = css`
  display: flex;

  padding: 1rem;

  .image-box {
    padding: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .text-box {
    width: 100%;
  }
  .update-btn {
    ${resetButton}
    cursor: pointer;
    text-decoration: underline;
    color: ${palette.cyan[500]};
    font-size: 1.3rem;
    margin-left: 2rem;
  }
`

const LabelSectionStyle = css`
  padding: 1rem 0;
  & + & {
    border-top: 1px solid ${palette.blueGrey[50]};
  }

  & > div {
    flex: 1;
  }

  .label {
    width: 15rem;
    padding-left: 1rem;
    font-size: 1.4rem;
    font-weight: 700;
  }
`

export default FavoriteBookSection
