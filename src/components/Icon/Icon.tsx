import React from 'react'
import * as svg from './svg'

export type IconNameType = keyof typeof svg
export type IconProps = {
  name: IconNameType
  className?: string
  style?: React.CSSProperties
  onClick?(): void
}

function Icon({ name, className, style, onClick }: IconProps) {
  return React.createElement(svg[name], { className, style, onClick })
}

export default Icon
