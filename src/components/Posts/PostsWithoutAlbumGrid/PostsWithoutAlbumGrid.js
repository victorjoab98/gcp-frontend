import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import PostPreview from '../PostPreview/PostPreview';
import './PostsWithoutAlbumGrid.scss'

export default function PostsWithoutAlbumGrid() {
  
  const posts = useAppSelector( state => state.content.posts );
  const [ postsWithoutAlbum, setPostsWithoutAlbum ] = useState( [] );

  useEffect( ()=>{
    const postsFiltered = posts.filter( post => post.isInAnyAlbum === false );
    setPostsWithoutAlbum( postsFiltered );
  }, [posts])

  return (
    <div className='posts'>
        <h2>Photos without album.</h2>
        <Grid columns={4}>
          { postsWithoutAlbum.length > 0 ?
              postsWithoutAlbum.map( post => (
                <Grid.Column key={post.id}>
                  <PostPreview post={post}/>
                </Grid.Column>
              ))
            : <p>There are no photos without album.</p>
          }
        </Grid>
    </div>
  )
}
