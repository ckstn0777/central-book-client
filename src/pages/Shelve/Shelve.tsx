import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import Button from '../../components/Button'
import AddBookModal from '../../components/Modal/AddBookModal'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Profile from '../../components/Profile'
import AddBookShelveModal from '../../components/Modal/AddBookShelveModal'
import { undraw_empty } from '../../assets/images'
import Header from '../../components/Header'
import BookShelveList from '../../components/BookShelveList/BookShelveList'
import BookInShelveList from '../../components/BookInShelveList'
import ShowBookModal from '../../components/Modal/ShowBookModal'
import {
  useBookShelveIdState,
  useBookShelveModeState,
  useSetBookShelveModeState,
} from '../../atoms/bookShelveState'
import { useSetBookSeqNumState } from '../../atoms/createBookReviewState'
import media from '../../lib/styles/media'
import ScrollContainer from 'react-indiana-drag-scroll'
import userStorage from '../../lib/storage/userStorage'
import { Helmet } from 'react-helmet-async'

export type ShelveProps = {}

function Shelve({}: ShelveProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [openBookModal, setOpenBookModal] = useState<boolean>(false)
  const [openShowBookModal, setShowOpenBookModal] = useState<boolean>(false)
  const [bookId, setBookId] = useState<number>(0)
  const [bookShelveId] = useBookShelveIdState()
  const setBookSeqNum = useSetBookSeqNumState()
  const setBookShelveMode = useSetBookShelveModeState()
  const bookShelveMode = useBookShelveModeState()

  const onChangeOpenBookModal = (
    exist: boolean,
    bookId: number,
    idx: number,
    isMine: boolean
  ) => {
    if (!isMine) {
      if (exist) {
        setShowOpenBookModal(true)
        setBookId(bookId)
        setBookSeqNum(idx)
      }
    } else {
      exist ? setShowOpenBookModal(true) : setOpenBookModal(true)
      setBookId(bookId)
      setBookSeqNum(idx)
    }
  }

  const user = userStorage.get()
  const history = useHistory()
  const { username: pathUsername } = useParams<{ username: string }>()

  useEffect(() => {
    return () => {
      setBookShelveMode('default')
    }
  }, [setBookShelveMode])

  if (!user) {
    history.replace('/')
  }

  return (
    <div css={Wrapper}>
      <Helmet>
        <title>내 서재 – Central Book</title>
      </Helmet>
      <div css={ContentStyle}>
        <Header text="내 책장 | 독서 노트" />

        {`@${user?.username}` === pathUsername && (
          <div className="button">
            <Button
              text="책장 추가"
              onClick={() => setOpen(true)}
              width="12rem"
            />
            <Button
              text={bookShelveMode === 'default' ? '책장 수정' : '수정 완료'}
              onClick={() =>
                setBookShelveMode(
                  bookShelveMode === 'default' ? 'update' : 'default'
                )
              }
              fill={false}
              width="12rem"
            />
          </div>
        )}

        <ScrollContainer className="scroll-container">
          <BookShelveList pathUsername={pathUsername} />
        </ScrollContainer>

        {bookShelveId !== -1 ? (
          <BookInShelveList
            isMine={`@${user?.username}` === pathUsername}
            onChangeOpenBookModal={onChangeOpenBookModal}
          />
        ) : (
          <div css={ShelveContentStyle}>
            <img src={undraw_empty} alt="empty" />
          </div>
        )}
      </div>
      <Profile user={user} pathUsername={pathUsername} />
      {open && (
        <AddBookShelveModal visible={open} onClose={() => setOpen(!open)} />
      )}
      {openBookModal && (
        <AddBookModal
          visible={openBookModal}
          onClose={() => setOpenBookModal(!openBookModal)}
        />
      )}
      {openShowBookModal && (
        <ShowBookModal
          bookId={bookId}
          visible={openShowBookModal}
          isMine={`@${user?.username}` === pathUsername}
          onClose={() => setShowOpenBookModal(!openShowBookModal)}
        />
      )}
    </div>
  )
}

const Wrapper = css`
  display: flex;

  ${media.xlarge} {
    flex-direction: column;
  }
`

const ContentStyle = css`
  flex: 1;

  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 1rem;
  min-width: 10rem;

  .button {
    align-self: flex-end;
    display: flex;
    button + button {
      margin-left: 0.7rem;
    }
  }

  ${media.large} {
    padding: 2rem 1rem;
  }

  ${media.small} {
    button {
      width: 8rem;
      // padding: 5px 6px;
    }
  }
`

const ShelveContentStyle = css`
  flex: 1;

  img {
    width: 50%;
    object-fit: contain;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`

export default React.memo(Shelve)

// const ImageStyle = css`
//   width: 50rem;
//   height: 20rem;
//   background-image: linear-gradient(
//       0deg,
//       rgba(254, 223, 27, 0.3),
//       rgba(254, 223, 27, 0.3)
//     ),
//     url(${undraw_empty});
//   background-size: cover;
// `

// const ShelveWrapper = css`
//   flex: 1;
// `
