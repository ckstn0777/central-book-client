import { useCallback, useState } from 'react'
import getSaseoBook, { SaseoBook } from '../lib/api/book/getSaseoBook'

export default function useSaseoBook() {
  const [books, setBooks] = useState<SaseoBook[]>()
  const [loading, setLoading] = useState(false)
  const [pageCnt, setPageCnt] = useState(0)

  const loadSaesoRecoomendBook = useCallback(
    async (category: number, currentPage: number) => {
      try {
        setLoading(true)
        const data = await getSaseoBook(category, currentPage)
        setBooks(data.SeseoBook)
        setPageCnt(Math.ceil(data.totalCnt / 14))
        setLoading(false)
      } catch (e) {}
    },
    []
  )

  return [books, pageCnt, loading, loadSaesoRecoomendBook] as const
}
