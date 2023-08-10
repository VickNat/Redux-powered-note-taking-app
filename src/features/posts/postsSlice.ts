import {
  PayloadAction,
  createSlice,
  nanoid
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { sub } from "date-fns"
import { title } from "process"


interface Post {
  id: string
  title: string
  content: string
  userId?: string
  date: string
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'This is title 1',
    content: 'This is post content This is post content This is post content This is post content.',
    userId: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '2',
    title: 'This is title 2',
    content: 'This is post content This is post content This is post content This is post content.',
    userId: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        // Push is not actually mutating the state in the createSlice function
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return ({
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          }
        })
      }
    },
    postEditted: {
      reducer: (state, action: PayloadAction<Post>) => {
        return state.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload
          } else {
            return post
          }
        });
      },
      prepare: (id, title, userId, content) => {
        return ({
          payload: {
            id: id,
            title,
            content,
            userId,
            date: new Date().toISOString(),
          }
        })
      }
    },
    postDeleted: {
      reducer: (state, action: PayloadAction<Post>) => {
        return state.filter((post) => post.id !== action.payload.id)
      },
      prepare: (id) => {
        return ({
          payload: {
            id,
            userId: "",
            title: "",
            content: "",
            date:  new Date().toISOString()
          }
        })
      }
    }
  }
})

// export selectors
export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded, postEditted, postDeleted } = postSlice.actions

export default postSlice.reducer