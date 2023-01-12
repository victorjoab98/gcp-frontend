import React, { useCallback, useState } from 'react'
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'  
import "./AvatarForm.scss"
import { useDispatch } from 'react-redux';
import { uploadPostThunk } from '../../../store/AuthSlice/authThunks';
import { useAppSelector } from '../../../hooks/useAppSelector';

export default function AvatarForm({ setShow }) {

  const [ response, setResponse ] = useState( { loading: false } );
  const user = useAppSelector( state => state.auth.user );
  const dispatch = useDispatch();

  const onDrop = useCallback( (acceptedFiles) => {
    setResponse( { loading: true } );
    dispatch( uploadPostThunk( acceptedFiles[0], user.id ) )
    .then( () => {
        setResponse( { loading: false } );
        setShow( false );
    }).catch( ( err ) => {
        setResponse( { loading: false, message: err.response.data.message || "We're sorry something went wrong. Please try again." } )
    })
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop
  })

  return (
    <div className='avatar-form'>
        { response.loading &&
            <Dimmer active>
                <Loader/>
                <p>Uploading</p>
            </Dimmer>
        }
        { response.message &&
            <Message negative>
                <p> {response.message }</p>
            </Message>
        }
        <Button {...getRootProps()}>Upload Photo</Button>
        <Button>Remove Photo</Button>
        <input {...getInputProps()} />
    </div>
  )
}
