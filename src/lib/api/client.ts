import axios from 'axios'

const client = axios.create({
  withCredentials: true,
})

client.defaults.baseURL = 'https://project-intern03.wjthinkbig.com/api'

export default client
