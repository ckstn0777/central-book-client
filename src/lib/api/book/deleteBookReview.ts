import client from '../client'

export default async function deleteBookReview(reviewId: number) {
  const response = await client.delete('/book', {
    params: {
      review_id: reviewId,
    },
  })
  return response.data
}
