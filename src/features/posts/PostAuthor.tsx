import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllUsers } from '../users/usersSlice'

interface Props {
  userId: string
}

const PostAuthor: React.FC<Props> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers)

  const author = users.find(user => user.id === userId)

  return <span>{author? author.name : "Unknown author"}</span>
}

export default PostAuthor