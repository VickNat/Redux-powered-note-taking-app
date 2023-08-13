import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'


const AddPostForm: React.FC = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const onTitleChanged = (e: { target: { value: React.SetStateAction<string> } }) => setTitle(e.target.value)
  const onContentChanged = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)
  const onAuthorChanged = (e: { target: { value: React.SetStateAction<string> } }) => setUserId(e.target.value)
  
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(addNewPost({title, body: content, userId})).unwrap()
  
        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch (error) {
        console.log("Failed to load post", error);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

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