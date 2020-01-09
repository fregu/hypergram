// @flow
import React from 'react'
import classNames from 'classnames'
import * as iconset from 'assets/icons'
import './index.css'

export type Props = {
  type: string,
  className?: string,
  size?: 'small' | 'large' | 'normal',
  color?: string,
  text?: string
}
export default function Icon({ type, className, size, color, text }: Props) {
  const IconComponent = iconset[type]

  return IconComponent ? (
    <div
      className={classNames('Icon', className, {
        [`color-${color}`]: color,
        [`Icon--${size}`]: size
      })}
      title={text}
    >
      <IconComponent />
    </div>
  ) : null
}
