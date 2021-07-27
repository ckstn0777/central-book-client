import React, { useCallback } from 'react'
import { useSetBookShelveState } from '../atoms/createBookShelveState'

export default function useSetBookShelve() {
  const [bookShelve, setBookShelve] = useSetBookShelveState()

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBookShelve(prev => ({
        ...prev,
        name: e.target.value,
      }))
    },
    [setBookShelve]
  )

  const onChangeColor = useCallback(
    ({ hex }) => {
      setBookShelve(prev => ({
        ...prev,
        color: hex,
      }))
    },
    [setBookShelve]
  )

  return { color: bookShelve.color, onChangeName, onChangeColor }
}
