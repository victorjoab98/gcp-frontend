import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useAppSelector } from '../hooks/useAppSelector';

export const UserLayout = () => {

  const isUserLogged = useAppSelector( state => state.auth.logged );

  useEffect( ()=> {
    if( !isUserLogged ){
      window.location.href = "/auth/login";
    }
  }, [isUserLogged])

  return (
    <>
        <Header>
            
        </Header>
    </>
  )
}
