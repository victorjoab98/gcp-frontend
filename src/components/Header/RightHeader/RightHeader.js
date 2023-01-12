import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import UserNotFound from '../../../assets/img/avatar.png'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { NewPostModal } from '../../Modal/NewPostModal'
import './RightHeader.scss'

export default function RightHeader(){
 
  const [ showModal, setShowModal ] = useState( false );
  const user = useAppSelector( state => state.auth.user );

  return (
    <>
      <div className='right-header'>
        <Icon name='plus' onClick={ () => setShowModal(true)}/>
        <Link to="/">
            <Image src={ user.urlPhoto ? user.urlPhoto : UserNotFound } avatar/>
        </Link>
      </div>
      <NewPostModal show={showModal} setShow={setShowModal}/>
    </>
  )
}
