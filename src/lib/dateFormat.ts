export default function dateFormat(date: Date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000
  const kr_curr = new Date(utc + KR_TIME_DIFF)

  let year = kr_curr.getFullYear()

  let month: string | number = kr_curr.getMonth() + 1
  month = month >= 10 ? month : '0' + month

  let day: string | number = kr_curr.getDate()
  day = day >= 10 ? day : '0' + day

  let hour: string | number = kr_curr.getHours()
  hour = hour >= 10 ? hour : '0' + hour

  let min: string | number = kr_curr.getMinutes()
  min = min >= 10 ? min : '0' + min

  let sec: string | number = kr_curr.getSeconds()
  sec = sec >= 10 ? sec : '0' + sec

  let purchaseDay =
    year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec

  return purchaseDay
}
