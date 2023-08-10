import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postDeleted, postEditted, selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import { selectAllUsers } from '../users/usersSlice'

interface Props {
  postId: string
}

const SinglePost: React.FC<Props> = ({ postId }) => {

  const posts = useAppSelector(selectAllPosts)
  const temp = posts.filter(post => post.id === postId)
  const post = temp[0]

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [userId, setUserId] = useState("")
  const [edit, setEdit] = useState(false)
  const [del, setDel] = useState(false)

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const onTitleChanged = (e: { target: { value: React.SetStateAction<string> } }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)
  const onAuthorChanged = (e: { target: { value: React.SetStateAction<string> } }) => setUserId(e.target.value)

  const editHandler = () => {
    if (title && content && userId) {
      dispatch(postEditted(postId, title, userId, content))
    }

    setEdit(!edit)
  }

  const deleteHandler = () => {
    dispatch(postDeleted(postId))
    setDel(!del)
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <form>
      {
        edit ? (
          <>
            <input
              type="text"
              id='postTitle'
              name='postTitle'
              value={title}
              onChange={onTitleChanged}
            />

            <select
              name="postAuthor"
              id="postAuthor"
              onChange={onAuthorChanged}
            >
              <option value=""></option>
              {userOptions}
            </select>
            <textarea
              id='postContent'
              name='postContent'
              value={content}
              onChange={onContentChanged}
            />
            <button
              className='btn'
              type='button'
              onClick={editHandler}
            >Done</button>
          </>
        ) : (
          <>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredit'>
              <PostAuthor userId={post.userId ? post.userId : ""} />
              <TimeAgo timestamp={post.date} />
            </p>
          </>
        )
      }

      <div>
        {
          !del ? (
            <>
              <button
                className='btn'
                type='button'
                onClick={
                  () => {
                    if (edit == false) {
                      setEdit(!edit)
                    }
                  }
                }>
                Edit
              </button>
              <button
                className='btn'
                type='button'
                onClick={deleteHandler}
              >
                Delete
              </button>
            </>
          ) : (
            <></>
          )
        }
      </div>
    </form>
  )
}

export default SinglePost