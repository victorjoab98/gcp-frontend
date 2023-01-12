import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react';
import DeleteAlbumForm from '../../components/Albums/DeleteAlbumForm';
import { BasicModal } from '../../components/Modal/BasicModal';
import PostPreview from '../../components/Posts/PostPreview/PostPreview';
// import Profile from '../../components/User/Profile';
import { useAppSelector } from '../../hooks/useAppSelector';
import "./AlbumView.scss"

export default function AlbumView() {

  const { albumId } = useParams();
  const [ album, setAlbum ] = useState({ name: 'Album'});
  const [ showDeletAlbumModal, setShowDeleteAlbumModal ] = useState( false );
  const [ postsInAlbum, setPostsInAlbum ] = useState( [] );
  // const user = useAppSelector( state => state.auth.user )
  const albums = useAppSelector( state => state.content.albums );
  const posts = useAppSelector( state => state.content.posts );
  
  useEffect( ()=>{
    if( albums.length === 0 ) return;
    const albumSelected = albums.find( a => a.id === Number(albumId) );
    setAlbum( albumSelected );
    // eslint-disable-next-line
  }, [ albums ] )

  useEffect( ()=>{
    if( posts.length === 0 ) return;
    // eslint-disable-next-line
    const postsFiltered = posts.filter( post => {
      const isInAlbum = post.appearsInAlbums.find( album => album.id === Number(albumId) );
      if( isInAlbum ) return post;
    });
    setPostsInAlbum( postsFiltered );
    // eslint-disable-next-line
  }, [posts] )

  return (
    <>
        {/* <Profile user={user}/> */}
        <div className='album-posts'>
          <div className='album-header'>
            <h2>Album:{' '} { album.name }</h2>
            {' '}<Icon name="trash alternate" color='grey' onClick={ () => setShowDeleteAlbumModal((true))}/>
          </div>
          <Grid columns={4}>
            { postsInAlbum.length > 0 ?
                postsInAlbum.map( post => (
                  <Grid.Column key={post.id}>
                    <PostPreview post={post}/>
                  </Grid.Column>
                ))
              : <p>There are no photos in this album.</p>
            }
          </Grid>
        </div>
        <BasicModal
          show={showDeletAlbumModal}
          setShow={setShowDeleteAlbumModal}
          title={'Are you sure to delete this album?'}
        >
          <DeleteAlbumForm album={album} setShow={setShowDeleteAlbumModal}/>
        </BasicModal>
    </>
  )
}
