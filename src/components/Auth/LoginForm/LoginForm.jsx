import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Loader, Message } from 'semantic-ui-react'
import * as yup from 'yup'
import '../RegisterForm/RegisterForm.scss'
import { loginThunk } from '../../../store/AuthSlice/authThunks'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

export const LoginForm = () => {

  const [ response, setResponse ] = useState({ loading : false })
  const dispatch = useAppDispatch();
  
  const formik = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    validationSchema: yup.object({
        username: yup.string().matches(/^[a-zA-Z0-9]*$/, "Username cannot have blank spaces").required("Username is required."),
        password: yup.string().required('Insert your password.')
    }),
    onSubmit: ( values ) => {
        onSubmit(values)
    }
  })

  const onSubmit = ( values ) =>  {
    setResponse({ loading: true })
    dispatch( loginThunk( values ) )
    .then( res => {
        setResponse({ loading: false, props: { success: true}, message: res.data.message|| 'Success' })
    })
    .catch( err => {
        setResponse({ loading: false, props: { error: true}, message: err.response.data.message || 'Error' })
    })
  }

  return (
    <>
        <h2 className='register-form-title'>Sign In</h2>
        { response.message && <Message {...response.props}><p>{response.message}</p></Message>}
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input value={formik.values.username} type='text' placeholder='Username' 
                name='username' onChange={formik.handleChange} error={formik.touched.username && formik.errors.username}/>
            <Form.Input value={formik.values.password} type='password' placeholder='Your Password' 
                name='password' onChange={formik.handleChange} error={formik.touched.password && formik.errors.password}/>
            <Button type="submit" className='btn-submit'>
                { response.loading === false 
                    ? 'Login'
                    : <Loader active inline='centered' />
                }
            </Button>
        </Form>
    </>
  )
}
