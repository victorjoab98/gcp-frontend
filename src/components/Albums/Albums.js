import React, { useState } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { useAppSelector } from '../../hooks/useAppSelector'
import NewAlbumModal from '../Modal/NewAlbumModal'
import AlbumPreview from './AlbumPreview/AlbumPreview'
import "./Albums.scss"

export default function Albums() {

  const [ showNewAlbumModal, setShowNewAlbumModal ] = useState( false )
  const user = useAppSelector( state => state.auth.user )
  const albums = useAppSelector( state => state.content.albums )
  const posts = useAppSelector( state => state.content.posts )
  const postsWithoutAlbum = posts.find( post => post.isInAnyAlbum === false )

  return (
    <>
    <div className='albums'>
      <div className='albums-header'>
            <h2>Albums</h2>
            <Icon name="plus square outline" color='grey' size="large" onClick={ () => setShowNewAlbumModal((true))}/>
      </div>
      <Grid columns={4}>
        <Grid.Column>
          {
            postsWithoutAlbum && <AlbumPreview album={{name: 'Posts without album', urlImagePreview: postsWithoutAlbum?.url}} urlRedirect='/mypicz/posts-withoutalbum' />

          }
        </Grid.Column>
        { albums.length ? albums.map( album => (
          <Grid.Column key={album.id}>
            <AlbumPreview album={album} urlRedirect={`/mypicz/album/${album.id}`}/>          
          </Grid.Column>
          ))
          : <h4>No albums</h4> 
      }
      </Grid>
    </div>
    <NewAlbumModal show={showNewAlbumModal} setShow={setShowNewAlbumModal} userId={user.id}/>
    </>
  )
}
