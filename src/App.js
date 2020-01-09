import React, { useState } from 'react'
import Header from 'components/Header'
import Post from 'components/Post'
import Button from 'components/Button'
import FileUploader from 'components/FileUploader'
import Modal from 'components/Modal'
import CreatePostForm from 'components/CreatePostForm'
import { useQuery, useMutation } from 'graphql-hooks'

import './App.css'
import 'base/index.css'

export default function App({ isAuthenticated, apiUrl, token }) {
  const { loading, data: { posts = [] } = {}, refetch } = useQuery(`
    query getPosts {
      posts(sort:"created_at:desc") {
        id
        user {
          id
          username
        }
        filter
        image {
          id
          url
        }
        description
        likes {
          id
          user {
            id
            username
          }
        }
        comments {
          id
          comment
          user {
            id
            username
          }
        }
      }
    }
  `)

  const { data: { me: user } = {} } = useQuery(
    `
    query me {
      me {
        id
        username
        email
      }
    }
  `
  )
  const [onLike] = useMutation(`
    mutation createLike($input: createLikeInput) {
      createLike(input: $input) {
        like {
          id
        }
      }
    }
  `)
  const [onUnlike] = useMutation(`
    mutation deleteLike($input: deleteLikeInput) {
      deleteLike(input: $input) {
        like {
          id
        }
      }
    }
  `)
  const [onComment] = useMutation(`
    mutation createComment($input: createCommentInput) {
      createComment(input: $input) {
        comment {
          id
        }
      }
    }
  `)
  const [createPost] = useMutation(`
    mutation createPost($input: createPostInput) {
      createPost(input: $input) {
        post {
          id
        }
      }
    }
  `)

  const uploadFile = ([image]) => {
    setUplodedImage(image)
  }

  const [loginModal, showLoginModal] = useState()
  const [uploadedImage, setUplodedImage] = useState()
  return (
    <div className="App layout-container layout-gutter">
      <Header className="App-header" appName="Hypergram">
        {isAuthenticated && user ? (
          <div>
            {user.username}{' '}
            <Button plain to="/logout">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={() => showLoginModal(true)}>Login</Button>
        )}
      </Header>
      <div className="App-content">
        {loading && !posts
          ? 'Loading'
          : posts.map(post => (
              <Post
                key={post.id}
                {...post}
                onLike={
                  user &&
                  !(post.likes || []).find(
                    ({ user: likeUser }) =>
                      String(likeUser.id) === String(user.id)
                  )
                    ? () =>
                        onLike({
                          variables: {
                            input: { data: { post: post.id, user: user.id } }
                          }
                        }).then(refetch)
                    : null
                }
                onUnlike={
                  user &&
                  (post.likes || []).find(
                    ({ user: likeUser }) =>
                      String(likeUser.id) === String(user.id)
                  )
                    ? () =>
                        onUnlike({
                          variables: {
                            input: {
                              where: {
                                id: post.likes.find(
                                  ({ user: likeUser }) =>
                                    String(likeUser.id) === String(user.id)
                                ).id
                              }
                            }
                          }
                        }).then(refetch)
                    : null
                }
                onComment={
                  user
                    ? value =>
                        onComment({
                          variables: {
                            input: {
                              data: {
                                user: user.id,
                                post: post.id,
                                comment: value
                              }
                            }
                          }
                        }).then(refetch)
                    : null
                }
              />
            ))}
      </div>
      {user ? (
        <FileUploader
          className="App-uploader"
          onUpload={uploadFile}
          url={`${apiUrl}/upload`}
          token={token}
        />
      ) : null}
      {uploadedImage ? (
        <Modal onClose={() => setUplodedImage(false)}>
          <CreatePostForm
            image={uploadedImage}
            onSubmit={(event, formData) => {
              createPost({
                variables: {
                  input: {
                    data: {
                      image: formData.image,
                      description: formData.description,
                      filter: formData.filter,
                      user: user.id
                    }
                  }
                }
              }).then(() => {
                setUplodedImage(false)
                refetch()
              })
            }}
          />
        </Modal>
      ) : null}
      {loginModal ? (
        <Modal onClose={() => showLoginModal(false)}>
          <h1>Log in</h1>
          <Button to={`${apiUrl}/connect/facebook`}>
            Log in using Facebook
          </Button>
          <hr />
          <Button to={`${apiUrl}/connect/google`}>Log in using Google</Button>
        </Modal>
      ) : null}
    </div>
  )
}
