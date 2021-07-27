import client from '../client'

export default async function searchBook(keyword: string) {
  const response = await client.get<SearchBookResult[]>('/book/search', {
    params: {
      keyword: keyword,
    },
  })

  return response.data
}

export type SearchBookResult = {
  id: number
  title: string
  author: string
  pub_date: string
  publisher: string
  category: string
  isbn: string
  // image_url: string
}
