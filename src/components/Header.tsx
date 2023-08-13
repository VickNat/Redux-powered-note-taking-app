import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getCounts, increaseCount } from '../features/posts/postsSlice'

const Header: React.FC = () => {

  const dispatch = useAppDispatch()
  const counts = useAppSelector(getCounts)

  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="post">Post</Link></li>
          <li><Link to="user">Users</Link></li>
        </ul>
        <button onClick={() => (
          dispatch(increaseCount({}))
        )}>
          {counts}
        </button>
      </nav>
    </header>
  )
}

export default Header