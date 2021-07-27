import { BookReviewType } from '../../../types/BookReview'
import client from '../client'

export default async function getBooksInShelve(shelveId: number) {
  const response = await client.get<BookReviewType[]>(`/shelve/${shelveId}`)
  return response.data
}
