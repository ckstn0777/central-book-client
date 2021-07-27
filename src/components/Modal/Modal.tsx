import React from 'react'
import { css } from '@emotion/react'
import useOnClickOutside from 'use-onclickoutside'
import palette from '../../lib/palette'
import Icon from '../Icon'
import transitions from '../../lib/styles/transitions'
import media from '../../lib/styles/media'

export type ModalProps = {
  children: React.ReactNode
  visible: boolean
  onClose(): void
  className?: string
}

function Modal({ children, visible, onClose, className }: ModalProps) {
  const ref = React.useRef(null)
  useOnClickOutside(ref, onClose)

  if (!visible) return null

  return (
    <>
      <div css={overlay}></div>
      <div css={centerWrapper}>
        <div css={whiteBox(visible)} ref={ref} className={className}>
          <Icon name="xmark" onClick={onClose} />
          {children}
        </div>
      </div>
    </>
  )
}

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`

const centerWrapper = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`

const whiteBox = (visible: boolean) => css`
  position: absolute;
  width: 75vw;
  min-height: 75vh;
  top: 50%;
  left: 50%;
  // transform: translate(50%, -50%);
  padding: 3rem;
  border-radius: 20px;
  background-color: white;

  display: flex;
  flex-direction: column;
  box-shadow: 2px 5px 3px 1px #00000066;

  font-size: 1.2rem;

  ${visible &&
  css`
    animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
  `}

  svg {
    position: absolute;
    top: 3rem;
    right: 3rem;
    fill: ${palette.blueGrey[900]};
    cursor: pointer;

    &:hover {
      fill: ${palette.blueGrey[500]};
    }
  }

  ${media.small} {
    width: 85vw;
    min-height: 85vh;
    padding: 3rem 2rem;
  }

  ${media.xsmall} {
    width: 100vw;
    min-height: 100vh;
    border-radius: 0;
  }
`

export default Modal
