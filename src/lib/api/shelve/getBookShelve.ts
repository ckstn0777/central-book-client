import { BookShelve } from '../../../types/BookShelve'
import client from '../client'

export default async function getBookShelve(username: string) {
  const response = await client.get<BookShelve[]>('/shelve', {
    params: { username: username },
  })
  return response.data
}
