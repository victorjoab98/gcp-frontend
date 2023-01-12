import React from 'react'
import { Modal } from 'semantic-ui-react';

export default function BasicModal({ show, setShow, title = '!', children }) {

  const onClose = () => {
    setShow( false );
  }
  return (
    <Modal size='mini' open={show} onClose={onClose} className="basic-modal" closeIcon>
        <Modal.Header>{ title }</Modal.Header>
        { children }
    </Modal>
  )
}
