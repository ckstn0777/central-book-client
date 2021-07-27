import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { ChartDataResult } from '../lib/api/me/getChartData'

const chartState = atom<ChartDataResult>({
  key: 'chartState',
  default: {
    publisher: [],
    category: [],
    author: [],
  },
})

const publisherChartState = selector<ChartDataResult['publisher']>({
  key: 'publisherChartState',
  get: ({ get }) => get(chartState).publisher,
})

const categoryChartState = selector<ChartDataResult['category']>({
  key: 'chartCategoryState',
  get: ({ get }) => get(chartState).category,
})

const authorChartState = selector<ChartDataResult['author']>({
  key: 'chartAuthorState',
  get: ({ get }) => get(chartState).author,
})

export function useSetChartState() {
  return useSetRecoilState(chartState)
}

export function usePublisherChart() {
  return useRecoilValue(publisherChartState)
}

export function useCategoryChart() {
  return useRecoilValue(categoryChartState)
}

export function useAuthorChart() {
  return useRecoilValue(authorChartState)
}
