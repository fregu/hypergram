// @flow
import React, { useRef } from 'react'
import classNames from 'classnames'
import serialize from 'form-serialize'

export type Props = {
  className?: string,
  children: Node
}
export default function Form({ className, children, ...attributes }: Props) {
  const formEl = useRef()
  const onChange = event => {
    const formData = serialize(formEl.current, { hash: true, empty: false })
    if (attributes.onChange) {
      attributes.onChange(event, formData)
    }
  }
  const onSubmit = event => {
    const formData = serialize(formEl.current, { hash: true, empty: false })
    if (attributes.onSubmit) {
      event.preventDefault()
      attributes.onSubmit(event, formData)
    }
  }
  return (
    <form
      ref={formEl}
      className={classNames('Form', className)}
      {...attributes}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
