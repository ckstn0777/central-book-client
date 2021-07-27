import client from '../client'

export default async function getRecentBook(pageNum: number) {
  const response = await client.get<RecentBookResult[]>('/book/recently', {
    params: { page_num: pageNum },
  })
  return response.data
}

export type RecentBookResult = {
  review_review: string
  book_id: number
  book_title: string
  book_image_url: string
  user_username: string
  user_photo_url: string
}
