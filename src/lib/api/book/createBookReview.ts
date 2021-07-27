import { BookReviewType } from '../../../types/BookReview'
import client from '../client'

export default async function createBookReview(bookReview: BookReviewType) {
  const response = await client.post('/book', bookReview)

  return response.data
}
