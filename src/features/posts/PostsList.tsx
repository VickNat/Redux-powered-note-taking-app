import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllPosts } from './postsSlice'
import SinglePost from './SinglePost'

const PostsList: React.FC = () => {

  const posts = useAppSelector(selectAllPosts)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article key={post.id}>
        <SinglePost postId={post.id} />
      </article>
    )
  })

  return (
    <section>
      <h2>Notes</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList