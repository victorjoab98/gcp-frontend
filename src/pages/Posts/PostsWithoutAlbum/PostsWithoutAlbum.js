import React, { useEffect } from 'react'
import PostsWithoutAlbumGrid from '../../../components/Posts/PostsWithoutAlbumGrid'
import Profile from '../../../components/User/Profile'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getContentThunkByUser } from '../../../store/PostSlices/postsThunks'

export default function PostsWithoutAlbum() {
  
  const user = useAppSelector( state => state.auth.user )
  const dispatch = useAppDispatch();
  const contentFetched = useAppSelector( state => state.content.contentFetched)

  useEffect( () => {
    if( contentFetched === false ){
      dispatch( getContentThunkByUser( user.id ) );
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Profile user={user}/>
      <PostsWithoutAlbumGrid />
    </>
  )
}
