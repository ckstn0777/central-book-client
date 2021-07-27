import { useQuery } from 'react-query'
import getBookInfo from '../../lib/api/book/getBookInfo'

export default function useBookInfoQuery(isbn: string, title: string) {
  const { data, isLoading } = useQuery(
    useBookInfoQuery.createKey(isbn),
    () => getBookInfo(isbn, title),
    { enabled: isbn !== '' }
  )

  return { data, isLoading }
}

useBookInfoQuery.createKey = (isbn: string) => ['bookInfo', isbn]
