import client from '../client'

export default async function createShelve(formData: FormData) {
  const response = await client.post('/shelve', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}
