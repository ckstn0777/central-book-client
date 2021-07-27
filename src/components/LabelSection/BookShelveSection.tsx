import { css } from '@emotion/react'
import LabelSection from '.'
import Input from '../Input'
import { CirclePicker } from 'react-color'
import useSetBookShelve from '../../hooks/useSetBookShelve'

export type BookShelveSectionProps = {}

function BookShelveSection({}: BookShelveSectionProps) {
  const { color, onChangeName, onChangeColor } = useSetBookShelve()

  return (
    <div css={Wrapper}>
      <LabelSection text="책장명">
        <Input onChange={onChangeName} />
      </LabelSection>
      <LabelSection text="색상">
        <CirclePicker
          width="100%"
          css={{ flex: 1 }}
          onChangeComplete={onChangeColor}
          color={color}
        />
      </LabelSection>
      {/* <LabelSection text="스타일">만들예정</LabelSection> */}
    </div>
  )
}

const Wrapper = css`
  flex: 1;
  padding: 1rem 2rem;
`

export default BookShelveSection
