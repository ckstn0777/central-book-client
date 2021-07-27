import produce from 'immer'
import {
  atom,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

type FavoriteBook = {
  book_image_url: string
  book_title: string
  favorite_book_recommend: string
}

type Profile = {
  id: number
  display_name: string
  photo_url: string
  information: string
}

type Follower = {
  user_id: number
  user_photo_url: string
  user_username: string
  user_display_name: string
}

type Following = {
  following_id: number
  user_photo_url: string
  user_username: string
  user_display_name: string
}

export type ProfileResult = {
  book_cnt: number
  favorite_book_category: string
  favorite_book: FavoriteBook
  profile: Profile
  follower: Follower[]
  following: Following[]
}

const profileState = atom<ProfileResult>({
  key: 'profileState',
  default: {
    book_cnt: 0,
    favorite_book_category: '',
    favorite_book: {
      book_image_url: '',
      book_title: '',
      favorite_book_recommend: '',
    },
    profile: {
      id: 0,
      display_name: '',
      photo_url: '',
      information: '',
    },
    follower: [],
    following: [],
  },
})

const selectProfileState = selector<ProfileResult['profile']>({
  key: 'selectProfileState',
  get: ({ get }) => get(profileState).profile,
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.profile = newValue
          })
    )
  },
})

const profileImageState = selector<ProfileResult['profile']['photo_url']>({
  key: 'profileImageState',
  get: ({ get }) => {
    return get(profileState).profile.photo_url
  },
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.profile.photo_url = newValue
          })
    )
  },
})

const favoriteBookState = selector<ProfileResult['favorite_book']>({
  key: 'favoriteBookState',
  get: ({ get }) => get(profileState).favorite_book,
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.favorite_book = newValue
          })
    )
  },
})

const bookCntState = selector<ProfileResult['book_cnt']>({
  key: 'bookCntState',
  get: ({ get }) => get(profileState).book_cnt,
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.book_cnt = newValue
          })
    )
  },
})

const followerState = selector<ProfileResult['follower']>({
  key: 'followerState',
  get: ({ get }) => get(profileState).follower,
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.follower = newValue
          })
    )
  },
})

const followingState = selector<ProfileResult['following']>({
  key: 'followingState',
  get: ({ get }) => get(profileState).following,
  set: ({ set }, newValue) => {
    set(profileState, preValue =>
      newValue instanceof DefaultValue
        ? newValue
        : produce(preValue, draft => {
            draft.following = newValue
          })
    )
  },
})

export function useSetProfileState() {
  return useSetRecoilState(profileState)
}

export function useProfileStateValue() {
  return useRecoilValue(profileState)
}

export function useSelectProfileState() {
  return useRecoilState(selectProfileState)
}

export function usePhotoImageState() {
  return useRecoilState(profileImageState)
}

export function useFavoriteBookState() {
  return useRecoilState(favoriteBookState)
}

export function useSetBookCntState() {
  return useSetRecoilState(bookCntState)
}

export function useFollowerActions() {
  const setFollower = useSetRecoilState(followerState)
  const setFollowing = useSetRecoilState(followingState)

  const append = (follower: Follower) => {
    setFollower(prev => prev.concat(follower))
  }

  const removeFollower = (following_id: number) => {
    setFollower(prev =>
      prev.filter(follower => follower.user_id !== following_id)
    )
  }

  const removeFollowing = (following_id: number) => {
    setFollowing(prev =>
      prev.filter(following => following.following_id !== following_id)
    )
  }

  return { append, removeFollower, removeFollowing }
}
