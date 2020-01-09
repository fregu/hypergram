// @flow
import React from 'react'
import classNames from 'classnames'
import Button from 'components/Button'
import Image, { type Props as ImageProps } from 'components/Image'
import Comment, { type Props as CommentProps } from 'components/Comment'
import CommentForm from 'components/CommentForm'
import Icon from 'components/Icon'
import './index.css'

export type Props = {
  user: {
    username: string
  },
  image: ImageProps,
  className?: string,
  description?: string,
  comments?: Array<CommentProps>,
  onComment?: Function,
  onLike?: Function,
  onUnlike?: Function
}

export default function Post({
  className,
  user: { username },
  image,
  filter,
  description,
  comments = [],
  likes = [],
  onComment,
  onLike,
  onUnlike
}: Props) {
  return (
    <section className={classNames('Post', classNames)}>
      <header className="Post-header">
        <span className="Post-user">{username}</span>
      </header>
      <div className="Post-content">
        {image ? (
          <Image
            key={image.id}
            {...image}
            filter={filter}
            url={image.url}
            width={700}
            className="Post-image"
          />
        ) : null}
      </div>
      <footer className="Post-footer">
        <div className="Post-likes">
          <span
            className="Post-likeCount"
            title={likes.map(({ user }) => user.username).join(', ')}
          >{`${likes.length} likes`}</span>

          {onLike ? (
            <Button onClick={onLike} plain>
              <Icon size="large" type="heart" text="Like" />
            </Button>
          ) : onUnlike ? (
            <Button onClick={onUnlike} plain>
              <Icon size="large" type="heartFilled" text="Unlike" />
            </Button>
          ) : null}
        </div>

        {description ? <p className="Post-description">{description}</p> : null}
        {comments.length ? (
          <div className="Post-comments">
            {comments.map(comment => (
              <Comment key={comment.id} {...comment} className="Post-comment" />
            ))}
          </div>
        ) : null}
        {onComment ? (
          <CommentForm onComment={onComment} className="Post-commentForm" />
        ) : null}
      </footer>
    </section>
  )
}
