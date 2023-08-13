import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import axios from "axios"


interface User {
  id: string
  name: string
}

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

const initialState: User[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers',async () => {
  try {
    const response = await axios.get(USERS_URL)    
    return [...response.data]
  } catch (error: any) {
    console.log(error.message);
    
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string) => state.users.find(user => Number(user.id) === Number(userId))

export default usersSlice.reducer