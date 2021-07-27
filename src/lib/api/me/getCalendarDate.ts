import client from '../client'

export default async function getCalendar(
  username: string,
  year: number,
  month: number
) {
  const response = await client.get<string[]>('/me/calendar', {
    params: { username, year, month },
  })
  const date = response.data

  let dayAndCnt = {} as any
  date.forEach(el => (dayAndCnt[el] = (dayAndCnt[el] || 0) + 1))

  return dayAndCnt
}
