import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  useAutoCompleteIndex,
  useResetAutoCompleteIndex,
} from '../../atoms/autocompleteIndex'
import getSearchBook, { SearchBookResult } from '../../lib/api/book/searchBook'

export default function useSearchQuery(keyword: string) {
  const [prevData, setPrevData] = useState<SearchBookResult[] | null>(null)
  const [selectedIndex, setSelectedIndex] = useAutoCompleteIndex()
  const reset = useResetAutoCompleteIndex()
  const { data, isLoading } = useQuery(
    useSearchQuery.createKey(keyword),
    () => getSearchBook(keyword),
    { enabled: keyword !== '' }
  )

  useEffect(() => {
    return reset
  }, [reset])

  useEffect(() => {
    if (data) {
      setPrevData(data)
    }
  }, [data])

  useEffect(() => {
    if (keyword === '') {
      setPrevData(null)
    }
    setSelectedIndex(-1)
  }, [keyword, setSelectedIndex])

  const goUp = () => {
    if (!data || data.length === 0) return
    if (selectedIndex === -1) {
      setSelectedIndex(data.length - 1)
      return
    }
    setSelectedIndex(selectedIndex - 1)
  }

  const goDown = () => {
    if (!data || data.length === 0) return
    if (selectedIndex === data.length - 1) {
      setSelectedIndex(-1)
      return
    }
    setSelectedIndex(selectedIndex + 1)
  }

  return { results: data || prevData, isLoading, goUp, goDown, selectedIndex }
}

useSearchQuery.createKey = (keyword: string) => ['search', keyword]
