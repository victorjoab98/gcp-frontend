import React, { useCallback } from 'react'
import { Button, Dimmer, Form, Icon, Loader, Modal } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import "./NewPostModal.scss"
import { useState } from 'react'
import { uploadPostThunk } from '../../../store/PostSlices/postsThunks'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

export default function NewPostModal({ show, setShow }) {
  const { id } = useAppSelector( state => state.auth.user );
  const dispatch = useAppDispatch();
  const [ fileUpload, setFileUpload ] = useState(null);
  const [ description, setDescription ] = useState('');
  const [ response, setResponse ] = useState({ loading: false });
  const onDrop = useCallback( (acceptedFiles) => {
    const file = acceptedFiles[0]
    setFileUpload({
        type: "image",
        file,
        preview: URL.createObjectURL(file)
    })
  }, [] )

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop
  })

  const onPublish = () => {
    setResponse( {loading: true} );
    dispatch(uploadPostThunk( fileUpload, id, description ))
    .then( res => {
      setResponse( { loading: false })
      onClose()
    })
    .catch( err => {
      setResponse( { loading: false })
      toast.warning('Post upload failed.')
    })

    console.log('publicando')
  }

  const onClose = ()=>{
    setFileUpload(null);
    setDescription('');
    setShow(false);
  }


  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-newpost">
        <div {...getRootProps()} className="dropzone" style={ fileUpload && { border: 0}}>
            { !fileUpload && 
                <>
                    <Icon name="cloud upload"/>
                    <p>Drag and drop your photo.</p>
                </>
            }
            <input {...getInputProps()}/>
        </div>

        {fileUpload?.type === "image" && (
            <div className='image' 
            style={{ backgroundImage: `url("${fileUpload.preview}"`} }/>
        )}

        { fileUpload && (
            <Form className='form-upload'>
              <Form.Input value={description} onChange={ ({target}) => setDescription(target.value)}placeholder='Description'/>
              <Button className='btn-upload btn-submit' onClick={onPublish} >
                Post Photo
              </Button>
            </Form>
        )}

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
