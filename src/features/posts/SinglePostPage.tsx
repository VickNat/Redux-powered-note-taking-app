import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllPosts, selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link, useParams } from 'react-router-dom'

const SinglePostPage: React.FC = () => {
  
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, String(postId)))

  console.log(post, postId);
  
  

  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to={`/post/edit/${post.id}`} >Edit post</Link>
      <p className="postCredit">
        <PostAuthor userId={post.userId ? post.userId : "1"} />
        <TimeAgo timestamp={post.date} />
      </p>
        <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage