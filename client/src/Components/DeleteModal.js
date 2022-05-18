import React from 'react';

import { Modal, Button } from 'react-bootstrap';

function DeleteModal({ show, handleClose, item, deleteItem }) {

  function handleDelete() {
    deleteItem(item);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting {item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to permanently delete {item.name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;