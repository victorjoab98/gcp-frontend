import React from 'react'
import { Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import {RegisterForm} from '../../components/Auth/RegisterForm/RegisterForm'
import './Auth.scss'

export default function Register() {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/auth/login')
  }

  return (
    <Container className='auth-container' fluid>
        <h1>MiPicz</h1>

        <div className='container-form'>
            <RegisterForm/>
        </div>

        <div className='change-form'>
            Do you already have an account? <span onClick={goToLogin}>Log In</span>
        </div>

    </Container>
  )
}
