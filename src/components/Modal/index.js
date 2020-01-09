// @flow
import React, { type Node } from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  children: Node,
  className?: string,
  onClose?: Function
}
export default function Modal({ children, className, onClose }: Props) {
  return (
    <div className={classNames('Modal', className)}>
      <div className="Modal-overlay" onClick={onClose} />
      <div className="Modal-box">{children}</div>
    </div>
  )
}
