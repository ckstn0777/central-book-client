import client from '../client'

export default async function getAlarmData() {
  const response = await client.get<AlarmResult[]>('/me/alarm')
  return response.data
}

export type AlarmResult = {
  book_id: number
  book_image_url: string
  book_title: string
  user_display_name: string
  user_id: number
  user_photo_url: string
  user_username: string
  alarm_create_at: Date
}
