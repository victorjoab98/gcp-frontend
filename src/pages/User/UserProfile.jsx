import React, {useEffect} from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'

import Profile from '../../components/User/Profile';
import { getContentThunkByUser } from '../../store/PostSlices/postsThunks';
import Albums from '../../components/Albums';

export default function UserProfile(){

  const user = useAppSelector( state => state.auth.user );
  const dispatch = useAppDispatch();
  const contentFetched = useAppSelector( state => state.content.contentFetched)
  
  useEffect( () => {
    if( contentFetched === false ){
      //Por ahora solo traere las fotos sin album, pero mas adelante debo traer todo
      dispatch( getContentThunkByUser( user.id ) );
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Profile user={user}/>

      {/* Aqui tendre la parte de "Todas las fotos" y "albumes"
      e albumes ira de primero el album de fotos sin album */}
      <Albums/>
    </>
  )
}
