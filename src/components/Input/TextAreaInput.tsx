import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'

export type TextAreaInputProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLTextAreaElement>

function TextAreaInput({ children, className, ...rest }: TextAreaInputProps) {
  return (
    <div css={InputWrapper} className={className}>
      <textarea rows={10} {...rest} />
      {children}
    </div>
  )
}

const InputWrapper = css`
  background-color: white;
  border: 2px solid ${palette.blueGrey[100]};
  border-radius: 15px;
  position: relative;

  & > div {
    text-align: right;
  }

  textarea {
    width: 100%;
    border: inherit;
    border-radius: inherit;
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
  }
`

export default TextAreaInput
