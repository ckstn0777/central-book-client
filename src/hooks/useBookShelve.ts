import { useCallback } from 'react'
import { useBookInShelveState } from '../atoms/bookInShelveState'
import {
  useBookShelveIdState,
  useBookShelveState,
} from '../atoms/bookShelveState'
// import { useSetBookShelveIdState } from '../atoms/createBookReviewState'
import getBooksInShelve from '../lib/api/book/getBooksInShelve'
import getBookShelve from '../lib/api/shelve/getBookShelve'

export default function useBookShelve() {
  const [bookShelve, setBookShelve] = useBookShelveState()
  const [, setBookInShelve] = useBookInShelveState()
  const [bookShelveId, setBookShelveId] = useBookShelveIdState()

  const onLoadBookShelve = useCallback(
    async (username: string) => {
      try {
        const data = await getBookShelve(username)
        setBookShelve(data)
        setBookShelveId(data[0].id)
      } catch (e) {}
    },
    [setBookShelve, setBookShelveId]
  )

  const onBookShelveClick = useCallback(
    async (shelveId: number) => {
      setBookInShelve(prev => ({ ...prev, loading: true }))

      const data = await getBooksInShelve(shelveId)
      setBookShelveId(shelveId)
      setBookInShelve({ loading: false, bookReviews: data })
    },
    [setBookShelveId, setBookInShelve]
  )

  const removeShelve = useCallback(
    (shelveId: number) => {
      setBookShelve(prev => prev.filter(shelve => shelve.id !== shelveId))
    },
    [setBookShelve]
  )

  return {
    bookShelve,
    bookShelveId,
    removeShelve,
    setBookShelveId,
    onLoadBookShelve,
    onBookShelveClick,
  }
}
