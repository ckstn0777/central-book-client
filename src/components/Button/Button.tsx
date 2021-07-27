import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { IconNameType } from '../Icon/Icon'
import Icon from '../Icon'

export type ButtonProps = {
  text: string
  fill?: boolean
  width?: string
  secondary?: boolean
  icon?: IconNameType
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  text,
  fill = true,
  width = '12rem',
  secondary = false,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button css={ButtonStyle(fill, secondary, width)} {...rest}>
      {icon && <Icon name={icon} />}
      <span>{text}</span>
    </button>
  )
}

const ButtonStyle = (fill: boolean, secondary: boolean, width: string) => css`
  background-color: ${secondary ? palette.cyan[400] : palette.amber[800]};
  border-radius: 10px;
  padding: 12px 18px;
  outline: none;
  color: white;
  border: none;
  cursor: pointer;
  width: ${width};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }

  span {
    font-size: 1rem;
    align-self: baseline;
  }

  &:hover {
    background-color: ${secondary ? palette.cyan[500] : palette.amber[900]};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${!fill &&
  css`
    background-color: white;
    border: ${secondary ? palette.cyan[400] : palette.amber[800]} 1px solid;
    color: ${secondary ? palette.cyan[400] : palette.amber[800]};

    &:hover {
      background-color: ${palette.amber[50]};
    }
  `}
`

export default Button
