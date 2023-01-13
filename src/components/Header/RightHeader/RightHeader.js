import React, { useState } from 'react'
import { Icon, Image } from 'semantic-ui-react'
import UserNotFound from '../../../assets/img/avatar.png'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { NewPostModal } from '../../Modal/NewPostModal'
import './RightHeader.scss'

export default function RightHeader(){
 
  const [ showModal, setShowModal ] = useState( false );
  const user = useAppSelector( state => state.auth.user );

  const onClickProfile = () => {
    window.location.href = "https://dsu-gcp-373020.uc.r.appspot.com/mypicz/profile/" + user.id;
  }

  return (
    <>
      <div className='right-header'>
        <Icon name='plus' onClick={ () => setShowModal(true)}/>

        <Image src={ user.urlPhoto ? user.urlPhoto : UserNotFound } avatar onClick={onClickProfile} />
      </div>
      <NewPostModal show={showModal} setShow={setShowModal}/>
    </>
  )
}
