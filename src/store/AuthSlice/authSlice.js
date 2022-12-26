import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged: false,
  user: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogged: (state, action) => {
      state.logged = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearState : () => initialState
  }
})

export const { 
    setUserLogged,
    setUser,
    clearState } = authSlice.actions;