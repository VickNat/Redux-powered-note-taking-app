import React from 'react'
import { Post, selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { EntityId } from '@reduxjs/toolkit'

interface Props {
  postId: EntityId
}

const PostExcerpt: React.FC<Props> = ({ postId }) => {  
  const post = useAppSelector((state) => selectPostById(state, postId))
  
  return (
    <article>
      <h2>{post?.title}</h2>
      <p className='excerpt'>{post?.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post?.id}`}>View post</Link>
        <PostAuthor userId={post?.userId ? post.userId : "1"} />
        <TimeAgo timestamp={post?.date ? post.date : ""} />
      </p>
        <ReactionButtons post={post} />
    </article>
  )
}

export default PostExcerpt