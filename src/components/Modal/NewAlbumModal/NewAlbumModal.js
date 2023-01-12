import React, { useState } from 'react'
import { Button, Dimmer, Form, Loader, Message, Modal } from 'semantic-ui-react'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { creteNewAlbumThunk } from '../../../store/PostSlices/postsThunks';
import "./NewAlbumModal.scss"

export default function NewAlbumModal( {show, setShow, userId } ) {

  const [ albumName, setAlbumName ] = useState('');
  const [ response, setResponse ] = useState({ loading: false });
  const dispatch = useAppDispatch();
  const onClose = () => {
    setResponse({ loading: false });
    setAlbumName('');
    setShow(false);
  };

  const onSubmit = () => {
    setResponse({ loading: true });
    if( !albumName ) {
        setResponse({ loading: false });
        return;
    };
    dispatch( creteNewAlbumThunk( albumName, userId ) )
    .then( () => {
        setResponse({ loading: false });
        onClose();
    })
    .catch( (err) => {
        setResponse({ loading: false,  message: err.response.data.message || "We're sorry something went wrong. Please try again."});
    })
  }

  return (
    <Modal open={ show } onClose={onClose} className="new-album-modal" size='mini'>
        <Modal.Header>Create New Album</Modal.Header>
        {
            response.message && 
            <Message negative>
            <Message.Header>{ response.message }</Message.Header>
                <p>Error</p>
            </Message>
        }
        <Form className='new-album-form'>
            <Form.Input
                value={albumName}
                onChange={ (e) => setAlbumName(e.target.value) }
                placeholder="Album name"/>
            <Button onClick={onSubmit}>Save Album</Button>
            <Button onClick={onClose}>Cancel</Button>
        </Form>

        {
          response.loading && 
            <Dimmer active className="uploading">
              <Loader/>
              <p>Uploading</p>
            </Dimmer>
        }
    </Modal>
  )
}
