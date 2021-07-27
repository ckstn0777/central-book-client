import axios from 'axios'

const client = axios.create({
  withCredentials: true,
})

client.defaults.baseURL = '/api'

export default client
