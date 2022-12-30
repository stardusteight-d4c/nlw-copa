import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

const initialState: InitialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.userSlice.user
