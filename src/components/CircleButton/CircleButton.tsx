import { css } from '@emotion/react'
import { IconNameType } from '../Icon/Icon'
import Icon from '../Icon'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'

export type CircleButtonProps = {
  icon: IconNameType
  text: string
  gender: string | null
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function CircleButton({ icon, text, gender, ...rest }: CircleButtonProps) {
  return (
    <button css={buttonStyle(icon === gender ? true : false)} {...rest}>
      <Icon name={icon} />
      <span>{text}</span>
    </button>
  )
}

const buttonStyle = (match: boolean) => css`
  ${resetButton}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 6rem;
    height: 6rem;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 50%;
  }

  &:hover {
    svg {
      background-color: grey;
      color: white;
    }
  }

  ${match &&
  css`
    svg {
      background-color: ${palette.black};
      color: white;
    }
  `}

  span {
    font-size: 1rem;
  }
`

export default CircleButton
