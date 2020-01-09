// @flow
import React from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  user: { username: string },
  comment: string,
  className?: string
}
export default function Comment({
  comment,
  user: { username },
  className
}: Props) {
  return (
    <div className={classNames('Comment', className)}>
      <p className={'Comment-comment'}>{comment}</p>
      <span className={'Comment-user'}>{username}</span>
    </div>
  )
}
