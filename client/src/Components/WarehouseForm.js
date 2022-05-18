import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function WarehouseForm({ createWarehouse }) {
  const [newWarehouseForm, setNewWarehouseForm] = useState({
    name: '',
    street: '',
    city: '',
    country: ''
  });

  function onEditField(e) {
    setNewWarehouseForm({
      ...newWarehouseForm,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <Form>
      <h2>Add Warehouse</h2>
      <Form.Group className="mb-3">
        <Form.Label>Warehouse Name</Form.Label>
        <Form.Control id='name' type="text" placeholder="Enter warehouse name" value={newWarehouseForm.name} onChange={(e) => onEditField(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control id='street' type="text" placeholder="Enter street address" value={newWarehouseForm.street} onChange={(e) => onEditField(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control id='city' type="text" placeholder="Enter City name" value={newWarehouseForm.city} onChange={(e) => onEditField(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control id='country' type="text" placeholder="Enter Country" value={newWarehouseForm.country} onChange={(e) => onEditField(e)} />
      </Form.Group>

      <Button variant="primary" onClick={(e) => createWarehouse(e, newWarehouseForm)}>
        Submit
      </Button>
    </Form>
  )
}

export default WarehouseForm;