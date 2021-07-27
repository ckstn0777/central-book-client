import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type InputProps = {
  className?: string
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ className, children, ...rest }: InputProps) {
  return (
    <div css={InputWrapper} className={className} tabIndex={0}>
      <input {...rest} />
      {children}
    </div>
  )
}

const InputWrapper = css`
  background-color: white;
  border: 1px solid ${palette.blueGrey[100]};
  border-radius: 15px;
  position: relative;

  &:focus,
  &:focus-visible {
    outline: none;
    border: 1px solid ${palette.amber[500]};
  }

  input {
    width: 100%;
    border: inherit;
    border-radius: inherit;
    outline: none;
    padding: 1rem 1.5rem;
  }

  input::placeholder {
    color: ${palette.grey[300]};
  }
`

export default Input
