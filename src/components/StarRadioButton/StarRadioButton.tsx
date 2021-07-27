import React from 'react'
import { css } from '@emotion/react'
import { useCreateBookReviewState } from '../../atoms/createBookReviewState'
import media from '../../lib/styles/media'

export type StarRadioButtonProps = {
  ratings?: number
}

function StarRadioButton({ ratings }: StarRadioButtonProps) {
  const [bookReview, setBookReview] = useCreateBookReviewState()
  const onChangeRatings = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookReview(prev => {
      return { ...prev, ratings: Number(e.target.value) }
    })
  }

  return (
    <div css={RadioWrapper}>
      {Array.from({ length: 10 }).map((_, i) => (
        <input
          key={i}
          type="radio"
          name="star"
          css={RadioStyle(ratings ? 10 - i <= ratings : false)}
          value={10 - i}
          // checked={true}
          onChange={onChangeRatings}
        />
      ))}
    </div>
  )
}

const RadioWrapper = css`
  position: relative;
  display: flex;
  margin: 10px 0;
  flex-direction: row-reverse;
`

const RadioStyle = (checked: boolean) => css`
  position: relative;
  width: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  overflow: hidden;

  &:before {
    content: '\\2605';
    position: absolute;
    width: 20px;
    height: 30px;
    font-size: 30px;
    position: absolute;
    top: -8px;
    left: 4px;
    color: #030b0f;
    transition: 0.5s;
  }

  ${checked &&
  css`
    &:before {
      color: #1f9cff;
    }
  `}

  &:nth-of-type(2n + 1)::before {
    right: 16px;
    left: initial;
  }

  &:hover ~ &::before,
  &:hover::before,
  &:checked ~ &::before,
  &:checked::before {
    color: #1f9cff;
  }

  ${media.large} {
    width: 15px;

    &:before {
      font-size: 2rem;
    }

    &:nth-of-type(2n + 1)::before {
      right: 6px;
      left: initial;
    }
  }

  /* ${media.medium} {
    display: none;
  } */
`

export default StarRadioButton
