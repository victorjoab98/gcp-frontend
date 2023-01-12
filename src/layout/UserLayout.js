import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getContentThunkByUser } from '../store/PostSlices/postsThunks';

export const UserLayout = () => {

  const isUserLogged = useAppSelector( state => state.auth.logged );
  const user = useAppSelector( state => state.auth.user );
  const fetchedContent = useAppSelector( state => state.content.contentFetched )
  const dispatch = useAppDispatch();

  useEffect( ()=> {
    if( !isUserLogged ){
      window.location.href = "/auth/login";
    }
  }, [isUserLogged])

  useEffect( ()=> {
    if( !fetchedContent ){
      dispatch( getContentThunkByUser( user.id ) )
    }
  // eslint-disable-next-line
  }, [fetchedContent])

  return (
    <>
      <Header/>
      <Container className="layout-basic">
        <Outlet />
      </Container>
    </>
  )
}
