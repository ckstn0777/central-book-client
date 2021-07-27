import client from '../client'

export default async function getBookInfo(isbn: string, title: string) {
  const response = await client.get(`/book/search/detail`, {
    params: { isbn: isbn, title: title },
  })

  return response.data
}
