import React from 'react'
import { Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm'

export default function Login (){

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/auth/register')
  }

  return (
    <Container className='auth-container' fluid>
    <h1>MiPicz</h1>

    <div className='container-form'>
        <LoginForm/>
    </div>

    <div className='change-form'>
        Do not you have an account yet? <span onClick={goToRegister}>Sign Up</span>
    </div>

</Container>
  )
}

