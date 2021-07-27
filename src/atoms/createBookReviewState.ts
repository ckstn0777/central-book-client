import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { BookReviewType } from '../types/BookReview'

const createBookReviewState = atom<BookReviewType>({
  key: 'createBookReviewState',
  default: {
    id: -1,
    seq_num: -1,
    ratings: -1,
    review: '',
    bookInfo: null,
  },
})

const bookInfoState = selector<BookReviewType['bookInfo']>({
  key: 'bookInfoState',
  get: ({ get }) => {
    return get(createBookReviewState).bookInfo
  },
  set: ({ set }, newValue) => {
    set(createBookReviewState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : { ...preValue, bookInfo: newValue }
    )
  },
})

const bookSeqNumState = selector<BookReviewType['seq_num']>({
  key: 'bookSeqNumState',
  get: ({ get }) => {
    return get(createBookReviewState).seq_num
  },
  set: ({ set }, newValue) => {
    set(createBookReviewState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : { ...preValue, seq_num: newValue }
    )
  },
})

export function useCreateBookReviewState() {
  return useRecoilState(createBookReviewState)
}

export function useBookInfoState() {
  return useRecoilState(bookInfoState)
}

export function useBookInfoResetState() {
  return useResetRecoilState(createBookReviewState)
}

export function useSetBookSeqNumState() {
  return useSetRecoilState(bookSeqNumState)
}
