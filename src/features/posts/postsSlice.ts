import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { sub } from "date-fns"

export interface Reaction {
  thumbsUp: number,
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface Post {
  id: string
  title: string
  body: string
  userId?: string
  date: string
  reactions: Reaction
}

interface InitialState {
  posts: Post[]
  status: string
  error: undefined | string
  counts: number
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a: Post, b: Post) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: "",
  counts: 0
})

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return [...response.data]
  } catch (error: any) {
    return error.message
  }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: { title: string, body: string, userId: string }) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
  } catch (error: any) {
    return error.message
  }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: { id: string, title: string, body: string, userId: string, reactions: Reaction }) => {
  const { id } = initialPost
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
    return response.data
  } catch (error: any) {
    return error.message
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: { id: string }) => {
  const { id } = initialPost
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`)
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  } catch (error: any) {
    return error.message
  }
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const postId = action.payload.postId
      const post = state.entities[postId]
      const reaction = action.payload.reaction as keyof Reaction

      if (post) {
        post.reactions[reaction]++
      }
    },
    increaseCount(state, action) {
      state.counts = state.counts + 1
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Adding date and reactions
        let min = 1
        const loadedPosts = action.payload.map((post: Post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        })

        // Add all fetched posts to the array
        postsAdapter.upsertMany(state, loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ? action.error.message : ""
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }

        postsAdapter.addOne(state, action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return
        }

        action.payload.date = new Date().toISOString()
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return
        }

        const { id } = action.payload
        postsAdapter.removeOne(state, id)
      })
  }
})

// Our adapter creates automatic selectors for us
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts)

// export selectors
export const selectAllStatus = (state: RootState) => state.posts.status
export const selectAllError = (state: RootState) => state.posts.error
export const getCounts = (state: RootState) => state.posts.counts
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => String(post.userId) === String(userId))
)
export const { increaseCount, reactionAdded } = postSlice.actions

export default postSlice.reducer