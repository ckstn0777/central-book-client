import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useResetRecoilState,
} from 'recoil'
import produce from 'immer'

type SetBookShelve = {
  name: string
  style: string
  color: string
  image_url: SetBookShelveImage
}

type SetBookShelveImage = {
  preview: string
  raw: File | undefined
}

const setBookShelveState = atom<SetBookShelve>({
  key: 'setBookShelveState',
  default: {
    name: '',
    style: 'null',
    color: '',
    image_url: {
      preview: '',
      raw: undefined,
    },
  },
})

const setBookShelveImageState = selector<SetBookShelveImage>({
  key: 'setBookShelveImageState',
  get: ({ get }) => {
    return get(setBookShelveState).image_url
  },
  set: ({ set }, newValue) => {
    set(
      setBookShelveState,
      preValue =>
        newValue instanceof DefaultValue
          ? newValue
          : produce(preValue, draft => {
              draft.image_url = newValue
            })

      // console.log(preValue)
      // return preValue
      // console.log({ ...preValue, preview: (newValue as any).preview })
      // return newValue instanceof DefaultValue ? newValue : newValue
    )
  },
})

export function useSetBookShelveState() {
  return useRecoilState(setBookShelveState)
}

export function useSetBookShelveImageState() {
  return useRecoilState(setBookShelveImageState)
}

export function useSetBookShelveResetState() {
  return useResetRecoilState(setBookShelveState)
}
// import React, { useState } from "react"

// export default function useSetBookShelve() {
//   const [name, setName] = useState<string>('')

//   const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value)
//   }

//   return { name, onChangeName }
// }
