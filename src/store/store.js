import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './AuthSlice'
import { contentSlice } from './PostSlices/contentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    content: contentSlice.reducer
  },
})