import { css } from '@emotion/react'

export type HeaderProps = {
  text: string
  className?: string
}

function Header({ text, className }: HeaderProps) {
  return (
    <h2 css={HeaderStyle} className={className}>
      {text}
    </h2>
  )
}

const HeaderStyle = css`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 1rem;
`

export default Header
