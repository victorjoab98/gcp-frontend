import React, { useState } from 'react'
import { Dimmer, Dropdown, Grid, Icon, Image, Label, Loader, Message, Modal } from 'semantic-ui-react';
import NewAlbumModal from '../NewAlbumModal';
import { formatDistance } from '../../../utils/dateUtils';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addPostToAlbumThunk, addToFavoritesThunk } from '../../../store/PostSlices/postsThunks';
import "./PostModal.scss"

export default function PostModal({ show, setShow, post }) {

  const [ response, setResponse ] = useState({ loading: false });
  const [ showAlbumModal, setShowAlbumModal ] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector( state => state.auth.user );
  const albums = useAppSelector( state => state.content.albums );
  const onClose = () => setShow(false);

  const options = albums
    .filter( album => !post.appearsInAlbums.includes(album) )
    .map( album => ({
      key: album.id,
      text: album.name,
      value: album.id
    }))

  const addToAlbum = ( albumId ) => {
    setResponse({ loading: true });
    dispatch( addPostToAlbumThunk( post.id, albumId, user.id ) )
    .then( () => {
      setResponse({ loading: false })
    })
    .catch( (err) => {
      setResponse({ loading: false, message: err.response.data.message || "We're sorry something went wrong. Please try again."})
    })
  }

  const addToFavorites = () => {
    setResponse({ loading : true })
    dispatch( addToFavoritesThunk( post.id) )
    .then( ()=> setResponse({ loading: false }))
    .catch((err) => {
      setResponse({ loading: false, message: err.response.data.message || "We're sorry something went wrong. Please try again."})
    })
  }

  return (
    <>
      <Modal open={show} onClose={onClose} className="post-modal">
        <Grid>
          <Grid.Column className='post-modal-left' width={10}>
              <Image  className="post-image" src={post?.url} />
          </Grid.Column>
          <Grid.Column className='post-modal-right p-0' width={6}>
            <div className='post-modal-info' >
              <div className='post-modal-description'>
                <h3>{user.username}</h3>
                <p className='post-description'>{ post.description }</p>
                <p className='post-date'>{ formatDistance( post.createdAt ) }</p>
              </div>
              <div>
                <Icon className={ post.isFavorite ? "favorite active" : "favorite"}
                      onClick={addToFavorites}
                      name='favorite' 
                      size='large'/>
              </div>
            </div>
            <hr color='#dbdbdb' size='1'/>
            <div className='post-modal-album'>
              <h4>Appears In:</h4>
              { post.appearsInAlbums.length 
                ? post.appearsInAlbums.map( album => (
                  <Label key={album.id}>
                    {album.name}
                  </Label>
                ))
                : <p className='no-albums'>This photo doesn't appear in any album.</p> 
              }
              {
                response.message && 
                  <Message negative>
                      <p>{ response.message }</p>
                  </Message>
              }
              <Dropdown
                button
                className='add-album icon'
                icon='plus'
                floating
                labeled
                text='Add to album'>
                  <Dropdown.Menu>
                    <Dropdown.Header content='Your albums'/>
                    {options.map((option) => (
                      <Dropdown.Item 
                            key={option.value} 
                            onClick={()=>addToAlbum(option.value)}
                            {...option} />
                    ))}
                    <Dropdown.Item 
                      key='new-album' 
                      text="--Create New Album--" 
                      value="new-album" 
                      onClick={()=>setShowAlbumModal(true)}/>
                  </Dropdown.Menu>
                </Dropdown>
                  
            </div>
          </Grid.Column>
        </Grid>
          { response.loading &&
            <Dimmer active>
              <Loader/>
              <p>Loading</p>
            </Dimmer>
          }
      </Modal>
      <NewAlbumModal show={showAlbumModal} setShow={setShowAlbumModal} userId={user.id}/>
    </>
  )
}
