import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  deletePost,
  selectPostById,
  updatePost
} from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const EditPostForm: React.FC = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector((state) => selectPostById(state, String(postId)))
  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title ? post.title : "")
  const [content, setContent] = useState(post?.body ? post.body : "")
  const [userId, setUserId] = useState(post?.userId ? post.body : "")
  const [requestStatus, setRequestStatus] = useState('idle')

  const dispatch = useAppDispatch()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onContentChanged = (e: any) => setContent(e.target.value)
  const onAuthorChanged = (e: any) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending')
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >{user.name}</option>
  ))

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending')
      dispatch(deletePost({ id: post.id })).unwrap()

      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch (err) {
      console.error('Failed to delete the post', err)
    } finally {
      setRequestStatus('idle')
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        <button className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm