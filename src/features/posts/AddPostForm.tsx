import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'


const AddPostForm: React.FC = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const onTitleChanged = (e: { target: { value: React.SetStateAction<string> } }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)
  const onAuthorChanged = (e: { target: { value: React.SetStateAction<string> } }) => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
    }

    setTitle('')
    setContent('')
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Note</h2>
      <form>
        <label htmlFor="postTitle">Note Title:</label>
        <input
          type="text"
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author name:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button
          className='btn'
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >Save note</button>
      </form>
    </section>
  )
}

export default AddPostForm