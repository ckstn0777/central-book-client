import { useCallback } from 'react'
import { useBookInShelveState } from '../atoms/bookInShelveState'
import { useBookShelveIdState } from '../atoms/bookShelveState'
import getBooksInShelve from '../lib/api/book/getBooksInShelve'

export default function useBookInShelve() {
  const [, setBookInShelve] = useBookInShelveState()
  const [bookShelveId] = useBookShelveIdState()

  const onLoadBookInShelve = useCallback(async () => {
    setBookInShelve(prev => ({ ...prev, loading: true }))
    try {
      const books = await getBooksInShelve(bookShelveId)
      setBookInShelve({ loading: false, bookReviews: books })
    } catch (e) {}
  }, [setBookInShelve, bookShelveId])

  return onLoadBookInShelve
}
