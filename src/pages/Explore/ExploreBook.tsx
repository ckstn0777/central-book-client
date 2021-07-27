import { css } from '@emotion/react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import useBookDetailQuery from '../../hooks/query/useBookDetailQuery'
import AnimationImage from '../../components/AnimationImage'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import dateFormat from '../../lib/dateFormat'

export type ExploreBookProps = {}

function ExploreBook({}: ExploreBookProps) {
  const { bookId } = useParams<{ bookId: string }>()
  const { book, review, user, isLoading } = useBookDetailQuery(Number(bookId))

  return (
    <div css={wrapper}>
      <div css={bookDetailWrapper}>
        <Header text="도서 상세보기" />
        <div css={bookDetailContent}>
          <AnimationImage title={book?.title} image_url={book?.image_url} />
          <div className="book-detail">
            <h2>{book?.title}</h2>
            <p>저자: {book?.author}</p>
            <p>출판사: {book?.publisher}</p>
            <p>출판일: {book?.pub_date}</p>
            <p>카테고리: {book?.category}</p>
            <p>가격: {book?.price}</p>
            <p>소개: {book?.description}</p>
            {book?.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                구매하기
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        <Header text="도서 리뷰" />
        {review?.map((review, idx) => (
          <div key={review.review_id} css={reviewWrapper}>
            <Link
              className="user-box"
              to={`/@${user?.[idx].user_username}/shelve`}
            >
              <img src={user?.[idx].user_photo_url} alt="user thumail" />
              <div className="user-display">
                <h3>{user?.[idx].user_display_name}</h3>
                <p>{dateFormat(new Date(review.review_created_at))}</p>
              </div>
            </Link>
            {/* <p>별점 : {review.review_ratings}</p> */}
            <p className="review">{review.review_review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const wrapper = css`
  padding: 3rem;

  ${media.medium} {
    padding: 1rem;
  }
`

const bookDetailWrapper = css`
  /* display: flex; */
  margin-bottom: 2rem;
`

const bookDetailContent = css`
  display: flex;
  align-items: center;

  .book-detail {
    padding: 1rem;
    margin-left: 2rem;

    h2 {
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 0.75rem;
      font-size: 1.1rem;
    }

    .link {
      text-decoration: underline;
      color: ${palette.cyan[500]};
      /* font-size: 1.3rem; */
    }
  }
  ${media.medium} {
    flex-direction: column;
  }
`

const reviewWrapper = css`
  padding: 1rem;
  border: 1px solid ${palette.blueGrey[100]};
  border-radius: 10px;
  & + & {
    margin-top: 1rem;
  }

  .user-box {
    display: flex;

    img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .user-display {
    margin-left: 1rem;
  }

  .review {
    font-size: 1.2rem;
    padding: 1rem;
  }
`

export default ExploreBook
