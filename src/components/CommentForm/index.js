// @flow
import React, { useState } from 'react'
import classNames from 'classnames'
import Form from 'components/Form'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import './index.css'

export type Props = {
  onComment: Function,
  className?: string
}
export default function CommentForm({ onComment, className }: Props) {
  const [value, updateValue] = useState()
  return (
    <Form
      className={classNames('CommentForm', className)}
      onSubmit={() => {
        onComment(value)
        updateValue('')
      }}
    >
      <Textarea
        name="comment"
        className="CommentForm-textarea"
        inputClassName="CommentForm-input"
        placeholder="Write a comment..."
        value={value}
        onChange={(event, value) => updateValue(value)}
      />
      {value ? (
        <Button plain className="CommentForm-submit">
          Send
        </Button>
      ) : null}
    </Form>
  )
}
