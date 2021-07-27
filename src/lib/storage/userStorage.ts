import { User } from '../api/types'

const userStorage = {
  get() {
    const data = localStorage.getItem('USER')

    if (!data || data === 'undefined') {
      return null
    }

    return JSON.parse(data) as User
  },

  set(user: User) {
    localStorage.setItem('USER', JSON.stringify(user))
  },

  clear() {
    localStorage.removeItem('USER')
  },
}

export default userStorage
