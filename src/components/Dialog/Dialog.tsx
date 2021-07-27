import { css } from '@emotion/react'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'

export type DialogProps = {
  visible: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm(): void
  onCancel(): void
  isDestructive?: boolean
}

function Dialog({
  title,
  message,
  confirmText = 'OK',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
  isDestructive = false,
  visible,
}: DialogProps) {
  if (!visible) return null

  return (
    <div>
      <div css={overlay}></div>
      <div css={centerWrapper}>
        <div css={whiteBox}>
          <h3>{title}</h3>
          <p>{message}</p>
          <div css={buttons}>
            <button onClick={onCancel} css={cancelButton}>
              {cancelText}
            </button>
            <button onClick={onConfirm} css={confirmButton(isDestructive)}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
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
  z-index: 100;
`

const whiteBox = css`
  width: 380px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 1rem 1rem rgba(67, 67, 67, 0.03);
  color: ${palette.blueGrey[900]};

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    line-height: 1.5;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
`

const buttons = css`
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 0.5rem;
  }
`

const buttonStyle = css`
  ${resetButton};
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
`

const cancelButton = css`
  ${buttonStyle};
  background-color: ${palette.blueGrey[300]};
  color: white;
  &:hover {
    background-color: ${palette.blueGrey[100]};
  }
`

const confirmButton = (isDestructive: boolean) => css`
  ${buttonStyle};
  background-color: ${isDestructive ? palette.red[400] : palette.amber[900]};
  color: white;

  &:hover {
    background-color: ${isDestructive ? palette.red[300] : palette.amber[800]};
  }
`

export default Dialog
