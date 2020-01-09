// @flow
import React from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  appName: string,
  className?: string
}

export default function Logotype({ appName, className }: Props) {
  return <h1 className={classNames('Logotype', className)}>{appName}</h1>
}
