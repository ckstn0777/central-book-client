import client from '../client'

export default async function getBookDetail(bookId: number) {
  const response = await client.get<BookDetailResult>(`/book`, {
    params: { book_id: bookId },
  })

  return response.data
}

type Book = {
  id: number
  title: string
  author: string
  description: string
  isbn: string
  publisher: string
  pub_date: string
  image_url: string
  price: number
  category: string
  link: string
}

type Review = {
  review_id: number
  review_ratings: number
  review_review: string
  review_created_at: Date
}

type User = {
  user_username: string
  user_display_name: string
  user_photo_url: string
}

export type BookDetailResult = {
  book: Book
  review: Review[]
  user: User[]
}
