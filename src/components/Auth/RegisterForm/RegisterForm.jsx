import React, { useState } from 'react'
import { Button, Form, Loader, Message } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './RegisterForm.scss'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { registerThunk } from '../../../store/AuthSlice/authThunks'

export const RegisterForm = () => {
  
  const [ response, setResponse ] = useState({ loading : false })
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        username: '',
        password: ''
    },
    validationSchema: yup.object({
        name: yup.string().required('Please add your name.'),
        email: yup.string().email("Please insert a valid email.").required('Please add your email.'),
        username: yup.string().matches(/^[a-zA-Z0-9]*$/, "Username cannot have blank spaces").required("Username is required."),
        password: yup.string().min(5, 'Must be at least 5 digits.').max(8, 'Must be maximum 8 digits.').required('Add your password.')
    }),
    onSubmit: ( values ) => {
        onSubmit(values)
    }
  })

  const onSubmit = ( values ) =>  {
    setResponse({ loading: true })
    dispatch( registerThunk( values ) )
    .then( res => {
        console.log('aqui')
        console.log(res)
    })
    .catch( err => {
        setResponse({ loading: false, props: { error: true}, message: err.response.data.message || 'Error' })
    })
  }


  return (
    <>
        <h2 className='register-form-title'>Sign Up</h2>
        { response.message && <Message {...response.props}><p>{response.message}</p></Message>}
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input 
                value={formik.values.name} type='text' placeholder='Name' 
                name='name' onChange={formik.handleChange} error={formik.touched.name && formik.errors.name}/>
            <Form.Input value={formik.values.email} type='email' placeholder='Email' 
                name='email' onChange={formik.handleChange} error={formik.touched.email && formik.errors.email}/>
            <Form.Input value={formik.values.username} type='text' placeholder='Username' 
                name='username' onChange={formik.handleChange} error={formik.touched.username && formik.errors.username}/>
            <Form.Input value={formik.values.password} type='password' placeholder='Your Password' 
                name='password' onChange={formik.handleChange} error={formik.touched.password && formik.errors.password}/>
            <Button type="submit" className='btn-submit'>
                { response.loading === false 
                    ? 'Register'
                    : <Loader active inline='centered' />
                }
            </Button>
        </Form>
    </>
  )
}
