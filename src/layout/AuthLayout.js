import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'

export default function AuthLayout (){

  const isUserLogged = useAppSelector( state => state.auth.logged );

  useEffect( ()=> {
    if( isUserLogged ){
      window.location.href = "/mypicz/home";
    }
  }, [isUserLogged])

  return (
    <div className="app">
      <Outlet />
    </div>
  )
}
