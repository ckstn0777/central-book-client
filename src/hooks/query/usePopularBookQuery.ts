import { useInfiniteQuery } from 'react-query'
import getPopularBook from '../../lib/api/book/getPopularBook'

export default function usePopularBookQuery(pageNum = 1) {
  return useInfiniteQuery(
    usePopularBookQuery.createKey(pageNum),
    ({ pageParam = 1 }) => getPopularBook(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) {
          return undefined
        }
        return pages.length + 1
      },
    }
  )
}

usePopularBookQuery.createKey = (pageNum: number) => ['bookPopluar', pageNum]
