import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from 'semantic-ui-react'
import "./AlbumPreview.scss"

export default function AlbumPreview({ album, urlRedirect }) {

  const navigate = useNavigate()

  const navigateToAlbum = () => {
    navigate(urlRedirect)
  }

  return (
    <>
      <div className='album-preview album-preview-image' 
        style={{ backgroundImage: `url('${album?.urlImagePreview}')` }}
        onClick={navigateToAlbum}>
        <Label>{album.name}</Label>
      </div>
    </>
  )
}
