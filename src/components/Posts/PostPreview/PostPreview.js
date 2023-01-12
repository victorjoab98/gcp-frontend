import React, { useState } from 'react'
import { Image } from 'semantic-ui-react'
import PostModal from '../../Modal/PostModal'
import "./PostPreview.scss"

export default function PostPreview({ post }) {
  
  const [ showModal, setShowModal ] = useState(false);
  return (
    <>
        <div className='post-preview'>
        <Image
            onClick={() => setShowModal(true)}
            className="post-preview-image" 
            src={post?.url}
            />
        </div>

        { showModal && 
          <PostModal
            show={showModal}
            setShow={setShowModal}
            post={post}/>
        }
    </>
  )
}
