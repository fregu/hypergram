// @flow
import React from 'react'
// classnames is a helper method for setting class names, remember to install dependency
import classNames from 'classnames'
import './index.css'

export type Props = {
  className?: string,
  plain?: boolean,
  onClick?: Function,
  to?: string,
  disabled?: boolean,
  theme?: string
}

export default function Button({
  className,
  children,
  plain,
  onClick,
  to,
  disabled,
  theme
}: Props) {
  const TagName = to ? 'a' : 'button'
  return (
    <TagName
      disabled={disabled}
      href={to || null}
      onClick={!disabled ? onClick : null}
      className={classNames('Button', className, {
        'Button--plain': plain,
        [`theme-${theme}`]: theme
      })}
    >
      <span className={classNames('Button-text')}>{children}</span>
    </TagName>
  )
}
