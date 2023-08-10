import { createSlice } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"


interface User {
  id: string
  name: string
}

const initialState: User[] = [
  {
    id: "1",
    name: "The man"
  },
  {
    id: "2",
    name: "The myth"
  },
  {
    id: "3",
    name: "The legend"
  }
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export const selectAllUsers = (state: RootState) => state.users

export default usersSlice.reducer