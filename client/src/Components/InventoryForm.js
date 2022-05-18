import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function InventoryForm({ warehouses, createItem, formErrors }) {
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    description: '',
    warehouse_id: undefined
  });

  function onEditField(e) {
    setNewItemForm({
      ...newItemForm,
      [e.target.id]: e.target.value,
    })
  }

  const warehouseOptions = warehouses.map((warehouse) => {
    return (
      <option key={warehouse.id} value={warehouse.id}>{warehouse.name} ({warehouse.street} | {warehouse.city}, {warehouse.country})</option>
    )
  })

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

      <Form.Group className="mb-3">
        <Form.Label>Warehouse</Form.Label>
        <Form.Select id='warehouse_id' value={newItemForm.warehouse_id} onChange={(e) => onEditField(e)}>
          <option value={undefined}>---Select a Warehouse---</option>
          {warehouseOptions}
        </Form.Select>
      </Form.Group>
      {formErrors ?
        formErrors.map(error => {
          return <p className='errors'>{error}</p>
        }) : 
        null
      }

      <Button variant="primary" onClick={(e) => createItem(e, newItemForm)}>
        Submit
      </Button>
    </Form>
  )
}

export default InventoryForm;