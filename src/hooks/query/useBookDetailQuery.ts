import { useQuery } from 'react-query'
import getBookDetail from '../../lib/api/book/getBookDetail'

export default function useBookDetailQuery(bookId: number) {
  const { data, isLoading } = useQuery(
    useBookDetailQuery.createKey(bookId),
    () => getBookDetail(bookId)
  )

  return { book: data?.book, review: data?.review, user: data?.user, isLoading }
}

useBookDetailQuery.createKey = (bookId: number) => ['bookId', bookId]
