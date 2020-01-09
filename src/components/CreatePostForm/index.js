// @flow
import React, { type Node, useState } from 'react'
import classNames from 'classnames'
import Form from 'components/Form'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import Image, { type Props as ImageProps } from 'components/Image'
import './index.css'

export type Props = {
  className?: string,
  onSubmit: Function,
  onChange?: Function,
  children?: Node,
  image: ImageProps
}
export default function CreatePostForm({
  className,
  onSubmit,
  onChange,
  children,
  image
}: Props) {
  const [filter, setFilter] = useState()
  const filters = [
    { text: 'Al dente', filter: 'e_art:al_dente' },
    { text: 'Athena', filter: 'e_art:athena' },
    { text: 'audrey', filter: 'e_art:audrey' },
    { text: 'aurora', filter: 'e_art:aurora' },
    { text: 'daguerre', filter: 'e_art:daguerre' },
    { text: 'eucalyptus', filter: 'e_art:eucalyptus' },
    { text: 'fes', filter: 'e_art:fes' },
    { text: 'frost', filter: 'e_art:frost' },
    { text: 'hairspray', filter: 'e_art:hairspray' },
    { text: 'hokusai', filter: 'e_art:hokusai' },
    { text: 'incognito', filter: 'e_art:incognito' },
    { text: 'linen', filter: 'e_art:linen' },
    { text: 'peacock', filter: 'e_art:peacock' },
    { text: 'primavera', filter: 'e_art:primavera' },
    { text: 'quartz', filter: 'e_art:quartz' },
    { text: 'red_rock', filter: 'e_art:red_rock' },
    { text: 'refresh', filter: 'e_art:refresh' },
    { text: 'sizzle', filter: 'e_art:sizzle' },
    { text: 'sonnet', filter: 'e_art:sonnet' },
    { text: 'ukulele', filter: 'e_art:ukulele' },
    { text: 'zorro', filter: 'e_art:zorro' },
    { text: 'oil paint', filter: 'e_oil_paint:70' },
    { text: 'cartoon', filter: 'e_cartoonify:70' },
    { text: 'vector', filter: 'e_vectorize:70' }
  ]
  return (
    <Form
      onSubmit={onSubmit}
      onChange={onChange}
      className={classNames('CreatePostForm', className)}
    >
      <input type="hidden" name="image" value={image.id} />
      <Image url={image.url} width={600} filter={filter} />
      {filter ? <input type="hidden" name="filter" value={filter} /> : null}

      <div className="CreatePostForm-filters">
        {filters.map(({ text, filter }) => (
          <div className="CreatePostForm-filter">
            <Image
              cover
              url={image.url}
              className="CreatePostForm-filterImage"
              width={100}
              filter={filter}
              onClick={() => {
                setFilter(filter)
              }}
            />
            {text}
          </div>
        ))}
      </div>
      <Textarea
        className="CreatePostForm-description"
        placeholder="Write a description"
        name="description"
      />
      <Button>Create post</Button>
    </Form>
  )
}
