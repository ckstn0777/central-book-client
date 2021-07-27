import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'

export type GridButtonProps = {
  age: number | null
  onSetAgeClick(age: number): void
}

function GridButton({ age, onSetAgeClick }: GridButtonProps) {
  return (
    <div css={AgeGridWrapper}>
      <button css={ButtonStyle(age === 10)} onClick={() => onSetAgeClick(10)}>
        10대
      </button>
      <button css={ButtonStyle(age === 20)} onClick={() => onSetAgeClick(20)}>
        20대
      </button>
      <button css={ButtonStyle(age === 30)} onClick={() => onSetAgeClick(30)}>
        30대
      </button>
      <button css={ButtonStyle(age === 40)} onClick={() => onSetAgeClick(40)}>
        40대
      </button>
      <button css={ButtonStyle(age === 50)} onClick={() => onSetAgeClick(50)}>
        50대
      </button>
      <button css={ButtonStyle(age === 60)} onClick={() => onSetAgeClick(60)}>
        60대 이상
      </button>
    </div>
  )
}

const AgeGridWrapper = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  align-items: center;
  justify-items: center; /* adjusted */

  margin-bottom: 2rem;
`

const ButtonStyle = (selected: boolean) => css`
  ${resetButton}
  width: 100%;
  height: 3rem;
  cursor: pointer;

  ${!selected &&
  css`
    &:hover {
      background-color: ${palette.blueGrey[100]};
    }
  `}

  ${selected &&
  css`
    background-color: ${palette.black};
    color: white;
  `}
`

export default GridButton
