import { css } from '@emotion/react'
import React, { useCallback, useRef } from 'react'
import { noimage } from '../../assets/images'
import { useSetBookShelveImageState } from '../../atoms/createBookShelveState'
import palette from '../../lib/palette'
import media from '../../lib/styles/media'
import Button from '../Button'

export type ImageUploadProps = {}

function ImageUpload({}: ImageUploadProps) {
  const [image, setImage] = useSetBookShelveImageState()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent) => {
      if (
        (e.target as HTMLInputElement).files &&
        (e.target as HTMLInputElement).files?.length
      ) {
        setImage({
          preview: URL.createObjectURL(
            (e.target as HTMLInputElement).files?.[0]
          ),
          raw: (e.target as HTMLInputElement).files?.[0],
        })
      }
    },
    [setImage]
  )

  return (
    <div css={ImageUploadStyle}>
      <div className="image-box">
        <img
          src={image.preview !== '' ? image.preview : noimage}
          alt="shelve thumnail"
        />
      </div>
      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <div className="button-box">
        <Button
          text="대표 이미지 업로드"
          secondary={true}
          onClick={() => hiddenFileInput.current?.click()}
        />
        <Button
          text="이미지 삭제"
          secondary={true}
          fill={false}
          // onClick={() => setImage({ preview: '', raw: undefined })}
        />
      </div>
    </div>
  )
}

const ImageUploadStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${palette.blueGrey[200]};

  .image-box {
    padding: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;

    img {
      width: 10rem;
      height: 10rem;
      object-fit: cover;
      border: 1px solid black;
      border-radius: 50%;
    }
  }

  .button-box {
    button + button {
      margin-top: 0.5rem;
    }
  }

  ${media.medium} {
    border-right: none;
    // border-bottom: 1px solid ${palette.blueGrey[200]};
    /* padding-bottom: 2rem; */
    margin-bottom: 2rem;
  }
`

export default ImageUpload
