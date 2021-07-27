import { atom, useRecoilState, useResetRecoilState } from 'recoil'

export const autocompleteIndex = atom<number>({
  key: 'autocompleteIndex',
  default: -1,
})

export function useAutoCompleteIndex() {
  return useRecoilState(autocompleteIndex)
}

export function useResetAutoCompleteIndex() {
  return useResetRecoilState(autocompleteIndex)
}
