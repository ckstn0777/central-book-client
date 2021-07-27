import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSetChartState } from '../../atoms/chartState'
import getChartData from '../../lib/api/me/getChartData'

export default function useChartDataQuery(username: string) {
  const { data, isLoading } = useQuery(
    useChartDataQuery.createKey(username),
    () => getChartData(username)
  )
  const setChartData = useSetChartState()

  useEffect(() => {
    if (!data) return
    setChartData(data)
  }, [setChartData, data])

  return { isLoading }
}

useChartDataQuery.createKey = (username: string) => ['chartData', username]
