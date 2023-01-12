import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contentFetched: false,
  posts: [],
  albums: []
}

export const contentSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setContentFetched: (state, action) => {
      state.contentFetched = action.payload
    },
    updatePostIsFavorite: (state, action) => {
      const post = action.payload
      const postIndex = state.posts.findIndex( p => p.id === post.id )
      state.posts[postIndex].isFavorite = post.isFavorite;
    },
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setAlbumes: (state, action) => {
      state.albums = action.payload
    },
    clearState : () => initialState
  }
})

export const {
  setContentFetched,
  updatePostIsFavorite,
  setPosts,
  setAlbumes,
  clearState } = contentSlice.actions;