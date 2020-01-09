// @flow
import React from 'react'
import classNames from 'classnames'
import './index.css'

export type Props = {
  className?: string,
  url?: string,
  src?: string,
  srcSet?: string,
  alt?: string,
  width?: number | string,
  height?: number | string,
  filter?: string
}

export default function Image({
  className,
  url,
  src,
  srcSet,
  width,
  height,
  alt,
  filter,
  cover,
  ...attributes
}: Props) {
  let imageSrc = src || url
  const isCloudinary = imageSrc.match(/cloudinary/)
  if (isCloudinary) {
    const params = []
    if (filter) {
      params.push(filter)
    }
    if (width) {
      params.push(`w_${width}`)
    }
    if (height) {
      params.push(`h_${height}`)
    }
    imageSrc = imageSrc.replace(/upload\//, `upload/${params.join(',')}/`)
  }

  return (
    <figure
      className={classNames('Image', className, {
        'Image--cover': cover
      })}
    >
      <img
        className="Image-image"
        src={imageSrc}
        {...{ ...attributes, alt, srcSet, width, height }}
      />
    </figure>
  )
}
