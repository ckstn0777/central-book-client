import client from '../client'

export default async function getChartData(pathUsername: string) {
  const response = await client.get('/me/chart', {
    params: { username: pathUsername },
  })
  return response.data
}

type Publisher = {
  publisher: string
  count: number
}
type Category = {
  category: string
  count: number
}
type Author = {
  author: string
  count: number
}

export type ChartDataResult = {
  publisher: Publisher[]
  category: Category[]
  author: Author[]
}
