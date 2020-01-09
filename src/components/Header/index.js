// @flow
import React from 'react'
import classNames from 'classnames'
import Logotype from 'components/Logotype'
import './index.css'

export type Props = {
  appName: string,
  className?: string
}
export default function Header({ appName, children, className }: Props) {
  return (
    <header className={classNames('Header', className)}>
      <Logotype className="Header-logotype" appName={appName} />
      <div className="Header-content">{children}</div>
    </header>
  )
}
