import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteAlbumThunk } from '../../../store/PostSlices/postsThunks';
import "./DeleteAlbumForm.scss"

export default function DeleteAlbumForm( { album, setShow }) {

  const [ response, setResponse ] = useState( { loading: false } );
  const navigate = useNavigate();
  const user = useAppSelector( state => state.auth.user );
  const dispatch = useAppDispatch();
  
  const onClose = () => setShow( false );
  const onSuccessClose = () => {
    setResponse( { loading: false } );
    navigate( '/mypicz/profile' );
    onClose();
  }
  
  const handleDeleteAlbum = () => {
    setResponse( { loading: true } );
    dispatch( deleteAlbumThunk( album.id, user.id ) )
    .then( () => {
        setResponse( { loading: false } );
        onSuccessClose();
    })
    .catch( ( err ) => 
        setResponse( { loading: false, message: err.response.data.message || "We're sorry something went wrong. Please try again." } )
    )
  }

  return (
    <div className='delete-album-form'>
        
        { response.message &&
            <Message negative>
                <p> {response.message }</p>
            </Message>
        }
        <Button onClick={handleDeleteAlbum}>Delete Album</Button>
        <Button onClick={onClose}>Cancel</Button>
        
        

        { response.loading &&
            <Dimmer active>
                <Loader/>
                <p>Loading</p>
            </Dimmer>
        }
        
    </div>
  )
}
