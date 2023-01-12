import React, { useState } from 'react'
import { Grid, Icon, Image } from 'semantic-ui-react'
import { BasicModal } from '../../Modal/BasicModal'
import AvatarForm from '../AvatarForm'
import AvatarNotFound from "../../../assets/img/avatar.png"
import "./Profile.scss"


export default function Profile({ user }) {
  
  const [ showModal, setShowModal ] = useState( false );

  return (
    <>
        <Grid className='profile'>
        <Grid.Column width={5} className="profile__left">
          <Image src={ user.urlPhoto ? user.urlPhoto : AvatarNotFound  } avatar onClick={ ()=>setShowModal(true)}/>
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
        
          <div className='profile-header'>
            <h2>{user.username}</h2>
            {' '}<Icon name="pencil" color='grey' size='small' onClick={()=>setShowModal(true)}/>
          </div>

          <div className='profile__bio'>
            <p className='name'>{user.name}</p>
            {
              user.biography && 
                <p className='biography'>{ user.biography }</p>
            }
          </div>
        </Grid.Column>
      </Grid>
      <BasicModal show={showModal} setShow={setShowModal} title={'Upload avatar'}>
        <AvatarForm setShow={setShowModal}/>
      </BasicModal>
    </>
  )
}
