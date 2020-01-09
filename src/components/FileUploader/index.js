// @flow
import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import Form from 'components/Form'
import uploadForm from 'utils/uploadForm'
import './index.css'

export type Props = {
  className?: string,
  name?: string,
  onChange?: Function,
  onUpload?: Function,
  url?: string,
  token?: string,
  multiple?: boolean
}
export default function FileUploader({
  name = 'files',
  className,
  label = 'Upload file',
  onChange,
  onUpload,
  multiple,
  url,
  token
}: Props) {
  const inputEl = useRef()
  const [isLoading, setLoading] = useState()
  return (
    <Form
      className={classNames('FileUploader', className, {
        'FileUpload--loading': isLoading
      })}
      encType="multipart/form-data"
      onChange={event => {
        const formData = new FormData(event.currentTarget)

        if (url && inputEl.current.files.length) {
          setLoading(true)
          uploadForm(formData, url, token).then(response => {
            // file uploaded
            setLoading(false)
            if (onUpload) {
              onUpload(response)
            }
          })
        }
        if (onChange) {
          onChange(event, inputEl.current.files)
        }
      }}
    >
      <div className="FileUploader-inputWrapper">
        <input
          accept="image/*"
          ref={inputEl}
          className="FileUploader-input"
          type="file"
          multiple={multiple}
          name={name}
        />
      </div>
    </Form>
  )
}
