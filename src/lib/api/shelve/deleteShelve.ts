import client from '../client'

export default async function deleteShelve(shelveId: number) {
  const response = await client.delete('/shelve', {
    params: {
      shelve_id: shelveId,
    },
  })
  return response.data
}
