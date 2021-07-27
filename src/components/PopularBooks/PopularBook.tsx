import { css } from '@emotion/react'
import { noimage } from '../../assets/images'
import { PopularBookResult } from '../../lib/api/book/getPopularBook'

export type PopularBookProps = {
  popularBook: PopularBookResult
}

function PopularBook({ popularBook }: PopularBookProps) {
  return (
    <div css={wrapper}>
      <img src={popularBook.book_image_url || noimage} alt="book thumnail" />
      <span>{popularBook.book_title}</span>
    </div>
  )
}

const wrapper = css``

export default PopularBook
