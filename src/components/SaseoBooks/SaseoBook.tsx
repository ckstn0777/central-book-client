import { css } from '@emotion/react'
import { bookCoverOverlay } from '../../assets/images'
import media from '../../lib/styles/media'

export type SaseoBookProps = {
  title: string
  image_url: string
  popular?: boolean
  count?: number
}

export function SaseoBook({
  title,
  image_url,
  popular = false,
  count,
}: SaseoBookProps) {
  return (
    <div css={BookWapper}>
      <div css={ImageWapper(popular)}>
        <img
          src={bookCoverOverlay}
          alt="book cover overlay"
          className="image-overlay"
        />
        <img src={image_url} alt="saseo book" className="book-image" />
        {popular && (
          <div css={RecoomendWapper}>
            <div className="badge">{count} people</div>
          </div>
        )}
      </div>
      <div css={TextWapper}>
        <h5>{title}</h5>
      </div>
    </div>
  )
}

const BookWapper = css`
  position: relative;
  display: block;
  height: 100%;
  opacity: 1;
  text-decoration: none;
  cursor: pointer;
`

const ImageWapper = (popular: boolean) => css`
  position: relative;
  margin-bottom: 32px;
  max-width: 100%;
  display: inline-block;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(-0.00072deg)
    rotateY(0.00064deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;

  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-shadow: 0 24px 24px -12px rgb(38 38 38 / 20%);
  transition: transform 0.2s, box-shadow 0.2s, -webkit-transform 0.2s;
  transition: all 0.2s;

  min-height: 16rem;

  ${media.medium} {
    min-height: 11rem;
  }

  ${media.small} {
    min-height: 8rem;
  }

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
    height: 100%;
    object-fit: cover;
    border: 0;
    vertical-align: middle;
    display: inline-block;
    width: 12rem;

    ${popular &&
    css`
      ${media.medium} {
        width: 8rem;
      }
    `}

    ${!popular &&
    css`
      max-width: 100%;
      width: 100%;
    `}
  }
`

const TextWapper = css`
  transition: color 0.2s;
  color: #1f4d8f;
  font-size: 1.4rem;
  line-height: 1.25;
  font-weight: 400;
  // font-family: 'Jua', sans-serif;
`

const RecoomendWapper = css`
  position: absolute;
  left: 0;
  top: auto;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding-top: 8px;
  padding-bottom: 5%;

  .badge {
    margin: 0;
    padding-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(38 38 38 / 10%);
    text-align: center;
    transition-property: background-color;
    font-size: 0.6em;
    line-height: 1;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: lowercase;
    white-space: nowrap;
    cursor: pointer;
    padding: 8px 10px;
    position: relative;
  }
`
