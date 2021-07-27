import { css, keyframes } from '@emotion/react'
import React, { forwardRef } from 'react'
import { bookCoverOverlay } from '../../assets/images'
import palette from '../../lib/palette'

export type PopularBookSkeletonProps = {}

function PopularBookSkeleton(
  {}: PopularBookSkeletonProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} css={BookWrapper}>
      <div css={ImageWapper}>
        <img
          src={bookCoverOverlay}
          alt="book cover overlay"
          className="image-overlay"
        />
        <div className="book-image" />
      </div>
      <div css={TextWapper}>{/* <h5>{title}</h5> */}</div>
    </div>
  )
}

const shining = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }

`

const BookWrapper = css`
  position: relative;
  display: block;
  height: 100%;
  opacity: 1;
  text-decoration: none;
  cursor: pointer;
  margin-left: 3rem;
`

const ImageWapper = css`
  position: relative;
  margin-bottom: 32px;
  /* max-width: 100%; */
  display: inline-block;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(-0.00072deg)
    rotateY(0.00064deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;

  display: flex;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
  box-shadow: 0 24px 24px -12px rgb(38 38 38 / 20%);
  transition: transform 0.2s, box-shadow 0.2s, -webkit-transform 0.2s;
  transition: all 0.2s;

  animation: ${shining} 1s ease-in-out infinite;

  &:hover {
    transform: translate3d(0px, -10px, 0px);
  }

  .image-overlay {
    mix-blend-mode: multiply;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
  }

  .book-image {
    height: 15rem;
    border: 0;
    display: inline-block;
    width: 12rem;
    background-color: ${palette.blueGrey[50]};
  }
`

const TextWapper = css`
  width: 12rem;
  height: 2rem;
  background-color: ${palette.blueGrey[50]};
  animation: ${shining} 1s ease-in-out infinite;
`

export default forwardRef<HTMLDivElement, PopularBookSkeletonProps>(
  PopularBookSkeleton
)
