import { css } from '@emotion/react'

export type LabelSectionProps = {
  text: string
  children?: React.ReactNode
  className?: string
}

function LabelSection({ text, children, className }: LabelSectionProps) {
  return (
    <section className={className} css={LabelSectionStyle}>
      <span className="label">{text}</span>
      {children}
    </section>
  )
}

const LabelSectionStyle = css`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  .label {
    width: 10rem;
    padding-left: 1rem;
    font-weight: 700;
  }
`

export default LabelSection
