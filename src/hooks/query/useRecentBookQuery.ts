import { useInfiniteQuery, useQuery } from 'react-query'
import getRecentBook from '../../lib/api/book/getRecentBook'

export default function useRecentBookQuery(pageNum = 1) {
  // return useInfiniteQuery(
  //   useRecentBookQuery.createKey(pageNum),
  //   ({ pageParam = 1 }) => getRecentBook(pageParam),
  //   {
  //     getNextPageParam: (lastPage, pages) => {
  //       if (lastPage.length === 0) {
  //         return undefined
  //       }
  //       return pages.length + 1
  //     },
  //   }
  // )
  const { data, isLoading } = useQuery(
    useRecentBookQuery.createKey(pageNum),
    () => getRecentBook(pageNum)
  )

  return { data, isLoading }
}

useRecentBookQuery.createKey = (pageNum: number) => ['bookRecent', pageNum]
