import client from '../client'

export default async function getPopularBook(pageNum: number) {
  const response = await client.get<PopularBookResult[]>('/book/popular', {
    params: { page_num: pageNum },
  })
  return response.data
}

export type PopularBookResult = {
  book_id: number
  book_title: string
  book_image_url: string
  count: number
}
