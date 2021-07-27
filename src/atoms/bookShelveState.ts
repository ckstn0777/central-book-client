import { useCallback } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { BookShelve } from '../types/BookShelve'

const bookShelveIdState = atom<number>({
  key: 'bookShelveIdState',
  default: -1,
})

const bookShelveState = atom<BookShelve[]>({
  key: 'bookShelveState',
  default: [],
})

const bookShelveModeState = atom({
  key: 'bookShelveModeState',
  default: 'default',
})

export function useBookShelveIdState() {
  return useRecoilState(bookShelveIdState)
}

export function useBookShelveState() {
  return useRecoilState(bookShelveState)
}

export function useBookShelveModeState() {
  return useRecoilValue(bookShelveModeState)
}

export function useSetBookShelveModeState() {
  return useSetRecoilState(bookShelveModeState)
}

export function useBookShelveActions() {
  const [bookShelve, setBookShelve] = useBookShelveState()

  const append = useCallback(
    (shelve: BookShelve) => {
      setBookShelve(prev => prev.concat(shelve))
    },
    [setBookShelve]
  )

  return {
    bookShelve,
    append,
  }
}
