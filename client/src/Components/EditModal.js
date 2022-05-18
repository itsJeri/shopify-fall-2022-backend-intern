import { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

function EditModal({ show, handleClose, item, setIsDelete, updateItem }) {
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    name: item.name,
    description: item.description
  });

  function onEditField(e) {
    setEditItemForm({
      ...editItemForm,
      [e.target.id]: e.target.value,
    })
  }

  function handleSaveEdit(e) {
    handleClose();
    updateItem(e, item, editItemForm);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editing "{ item.name }"</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control id='name' type="text" placeholder="Enter item name" value={editItemForm.name} onChange={(e) => onEditField(e)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Item Description</Form.Label>
          <Form.Control id='description' type="text" placeholder="Enter a description" value={editItemForm.description} onChange={(e) => onEditField(e)} />
        </Form.Group>
        <Button variant="danger" onClick={() => setIsDelete(true)}>
          Delete
        </Button>
      </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => handleSaveEdit(e)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;