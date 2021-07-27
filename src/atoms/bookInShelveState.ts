import { useCallback } from 'react'
import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import { BookReviewType } from '../types/BookReview'

type BookInShelve = {
  loading: boolean
  bookReviews: BookReviewType[]
}

const bookInShelveState = atom<BookInShelve>({
  key: 'bookInShelveState',
  default: {
    loading: false,
    bookReviews: [],
  },
})

const bookInShelveSelectState = selectorFamily<
  BookReviewType | undefined,
  number
>({
  key: 'bookInShelveSelectState',
  get:
    (bookId: number) =>
    ({ get }) => {
      return get(bookInShelveState).bookReviews.find(
        book => book.bookInfo?.id === bookId
      )
    },
})

const bookInShelveOrderState = selector<(BookReviewType | null)[]>({
  key: 'bookInShelveOrderState',
  get: ({ get }) => {
    const result: (BookReviewType | null)[] = Array.from({ length: 10 }).map(
      (_, i) => null
    )
    get(bookInShelveState).bookReviews.forEach(bookInShelve => {
      result[bookInShelve.seq_num] = bookInShelve
    })
    return result
  },
})

const bookInShelveLoadingState = selector<BookInShelve['loading']>({
  key: 'bookInShelveLoadingState',
  get: ({ get }) => {
    return get(bookInShelveState).loading
  },
})

export function useBookInShelveState() {
  return useRecoilState(bookInShelveState)
}

export function useBookInShelveSelectState(bookId: number) {
  return useRecoilValue(bookInShelveSelectState(bookId))
}

export function useBookInShelveOrderState() {
  return useRecoilValue(bookInShelveOrderState)
}

export function useBookInShelveLoadingState() {
  return useRecoilValue(bookInShelveLoadingState)
}

export function BookInShelveStateActions() {
  const [bookInShelve, setBookInShelve] = useRecoilState(bookInShelveState)

  const append = useCallback(
    (book: BookReviewType) => {
      setBookInShelve(prev => ({
        ...prev,
        bookReviews: prev.bookReviews.concat(book),
      }))
    },
    [setBookInShelve]
  )

  const remove = useCallback(
    (reviewId: number) => {
      setBookInShelve(prev => ({
        ...prev,
        bookReviews: prev.bookReviews.filter(review => review.id !== reviewId),
      }))
      // bookInShelve.bookReviews.find((review) => review.id !== reviewId
    },
    [setBookInShelve]
  )

  return { append, remove }
}
