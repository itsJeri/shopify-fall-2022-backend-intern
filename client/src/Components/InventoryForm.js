import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function InventoryForm({ createItem }) {
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    description: ''
  });

  function onEditField(e) {
    setNewItemForm({
      ...newItemForm,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <Form>
      <h2>Create New Item</h2>
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Form.Control id='name' type="text" placeholder="Enter item name" value={newItemForm.name} onChange={(e) => onEditField(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Item Description</Form.Label>
        <Form.Control id='description' type="text" placeholder="Enter a description" value={newItemForm.description} onChange={(e) => onEditField(e)} />
      </Form.Group>
      <Button variant="primary" onClick={(e) => createItem(e, newItemForm)}>
        Submit
      </Button>
    </Form>
  )
}

export default InventoryForm;