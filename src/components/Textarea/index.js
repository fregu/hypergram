// @flow
import React, { useState } from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  className?: string,
  inputClassName?: string,
  defaultValue?: string,
  palue?: string,
  onChange?: Function
}
export default function Textarea({
  className,
  inputClassName,
  defaultValue,
  value: propValue,
  onChange,
  ...attributes
}: Props) {
  const [value, setValue] = useState(defaultValue)
  const [oldPropValue, updatePropValue] = useState(propValue)
  // Look if prop value is updated and overwrite internal state
  if (oldPropValue !== propValue) {
    setValue(propValue)
    updatePropValue(propValue)
  }
  return (
    <div className={classNames('Textarea', className)}>
      <textarea
        className={classNames('Textarea-input', inputClassName)}
        onChange={event => {
          const val = event.target.value
          setValue(val)
          if (onChange) {
            onChange(event, val)
          }
        }}
        value={value}
        {...attributes}
      />
      <pre className="Textarea-pre">{value}</pre>
    </div>
  )
}
