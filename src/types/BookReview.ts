export type BookInfo = {
  id: number
  title: string
  author: string
  category: string
  description: string
  image_url: string
  isbn: string
  price: number
  pub_data: string
  publisher: string
  link: string
}

type Users = {
  book_id: number
  username: string
  photo_url: string
}

export type BookReviewType = {
  id: number
  bookShelveId?: number
  ratings: number
  review: string
  seq_num: number
  bookInfo: BookInfo | null
  user?: Users[]
}
