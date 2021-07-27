import client from '../client'

export default async function getSaseoBook(
  category: number,
  currentPage: number
) {
  const response = await client.get<SaseoBookResult>('/book/saseo', {
    params: { category, current_page: currentPage },
  })

  return response.data
}

export type SaseoBook = {
  title: string
  author: string
  publisher: string
  content: string
  recommand: string
  image_url: string
}

export type SaseoBookResult = {
  totalCnt: number
  SeseoBook: SaseoBook[]
}
