import { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

function EditModal({ show, handleClose, item, warehouses, setIsDelete, updateItem }) {
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
    warehouse_id: item.warehouse_id
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

  const warehouseOptions = warehouses.map((warehouse) => {
      return (
        <option key={warehouse.id} value={warehouse.id}>{warehouse.name} ({warehouse.street} | {warehouse.city}, {warehouse.country})</option>
      )
  })

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

        <Form.Group className="mb-3">
          <Form.Label>Warehouse</Form.Label>
          <Form.Select id='warehouse_id' defaultValue={item.warehouse.id} value={editItemForm.warehouse_id} onChange={(e) => onEditField(e)}>
            {warehouseOptions}
          </Form.Select>
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