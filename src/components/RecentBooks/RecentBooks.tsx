import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useRecentBookQuery from '../../hooks/query/useRecentBookQuery'
import getRecentBook, {
  RecentBookResult,
} from '../../lib/api/book/getRecentBook'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Header from '../Header'
import Icon from '../Icon'

export type RecentBooksProps = {}

function RecentBooks({}: RecentBooksProps) {
  // const {
  //   data,
  //   hasNextPage,
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasPreviousPage,
  // } = useRecentBookQuery()
  const [items, setItems] = useState<RecentBookResult[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getRecentBook(currentPage).then(data => {
      if (data.length === 0) {
        toast.info('최신 유저리뷰가 더이상 없습니다..ㅠㅠ')
        setCurrentPage(prev => prev - 1)
        return
      }
      setItems(data)
    })
  }, [currentPage])

  // const items = useMemo(() => {
  //   if (!data) return null
  //   return data.pages[currentPage].flat()
  // }, [data])

  const onPrevPage = useCallback(() => {
    if (currentPage === 1) return null
    setCurrentPage(prev => prev - 1)
  }, [currentPage])

  const onNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1)
  }, [])

  // useEffect(() => {
  //   fetchNextPage()
  // }, [])

  return (
    <div css={recentReviewBox}>
      <div className="recent-header">
        <Header text="최신 유저리뷰" />
        <div>
          <Icon name="arrow_back" className="prev" onClick={onPrevPage} />
          <Icon name="arrow_forward" className="next" onClick={onNextPage} />
        </div>
      </div>
      <div className="recent-body">
        {items?.map(data => (
          <div className="recent-body-card">
            <img src={data.book_image_url} alt="saseo book" />
            <div className="text-box">
              <h3>{data.book_title}</h3>
              <p>{data.review_review}</p>
              <div>
                <img src={data.user_photo_url} alt="avatar" />
                <span>{data.user_username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const recentReviewBox = css`
  padding: 3rem 2rem;
  padding-top: 0;

  .recent-header {
    display: flex;
    align-items: center;

    h2 {
      flex: 1;
    }
    svg {
      padding: 1rem;
      width: 45px;
      height: 45px;
      cursor: pointer;
    }
    svg + svg {
      margin-left: 1rem;
    }
    .prev {
      background-color: ${palette.blueGrey[300]};
      color: white;
    }
    .next {
      background-color: ${palette.amber[800]};
      color: white;
    }
  }

  .recent-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    padding: 1rem 0;

    ${media.small} {
      grid-template-columns: repeat(1, 1fr);
    }

    .recent-body-card {
      padding: 1rem;
      background: #00bdb4;
      border-radius: 15px;
      box-shadow: -15px -15px 15px rgba(255, 255, 255, 0.2),
        15px 15px 15px rgba(0, 0, 0, 0.1),
        inset -50px -50px 50px rgba(255, 255, 255, 0.2),
        inset 50px 50px 50px rgba(0, 0, 0, 0.1);

      display: flex;
      justify-content: center;
      align-items: center;

      ${media.xsmall} {
        flex-direction: column;
      }

      img {
        width: 10rem;
        height: 10rem;
        object-fit: contain;
        margin-right: 10px;
      }
      .text-box {
        flex: 1;
        color: white;
        padding: 10px;

        h3,
        p {
          margin-bottom: 10px;
        }

        div {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          img {
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            object-fit: cover;
            margin-right: 5px;
          }
          span {
            font-weight: bold;
          }
        }
      }
    }
  }
`

export default RecentBooks
