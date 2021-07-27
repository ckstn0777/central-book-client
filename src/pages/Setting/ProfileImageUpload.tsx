import { css } from '@emotion/react'
import { useCallback, useEffect, useRef } from 'react'
import { useMutation } from 'react-query'
import { noimage } from '../../assets/images'
import { usePhotoImageState } from '../../atoms/profileState'
import Button from '../../components/Button'
import updateMyProfile from '../../lib/api/me/updateMyProfile'
import palette from '../../lib/palette'

export type ProfileImageUploadProps = {}

function ProfileImageUpload({}: ProfileImageUploadProps) {
  const [image, setImage] = usePhotoImageState()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const mutation = useMutation<any, unknown, FormData>(profile =>
    updateMyProfile(profile)
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent) => {
      if (
        (e.target as HTMLInputElement).files &&
        (e.target as HTMLInputElement).files?.length
      ) {
        // setImage({
        //   preview: URL.createObjectURL(
        //     (e.target as HTMLInputElement).files?.[0]
        //   ),
        //   raw: (e.target as HTMLInputElement).files?.[0],
        // })

        const formData = new FormData()
        formData.append('type', 'image')
        formData.append('photo_url', (e.target as HTMLInputElement).files?.[0]!)
        mutation.mutate(formData)
      }
    },
    [mutation]
  )

  useEffect(() => {
    if (mutation.isSuccess) {
      setImage(mutation.data)
      mutation.reset()
    }
  }, [mutation, setImage])

  return (
    <div css={ImageUploadStyle}>
      <div className="image-box">
        <img src={image !== '' ? image : noimage} alt="user thumnail" />
      </div>
      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <Button
        text="대표 이미지 업로드"
        onClick={() => hiddenFileInput.current?.click()}
      />
      <Button text="이미지 삭제" fill={false} />
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
`

export default ProfileImageUpload
