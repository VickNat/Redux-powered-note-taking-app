import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { Post, Reaction, reactionAdded } from './postsSlice'

interface Props {
  post: Post | undefined
}

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

const ReactionButtons: React.FC<Props> = ({ post }) => {

  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([reactName, emoji]) => {
    const name = reactName as keyof Reaction

    return (
        <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() =>
                dispatch(reactionAdded({ postId: post?.id, reaction: name }))
            }
        >
            {emoji} {post?.reactions[name]}
        </button>
    )
})

  return (
    <>{reactionButtons}</>
  )
}

export default ReactionButtons