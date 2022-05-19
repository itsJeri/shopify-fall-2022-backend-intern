import React from 'react';
import TableRow from './TableRow';

import { Table } from 'react-bootstrap';

function InventoryTable({ items, warehouses, updateItem, deleteItem, modalErrors, success, setSuccess }) {
  
  const tableElements = items.map((item, idx) => {
    return (
      <TableRow 
        key={idx}
        item={item}
        warehouses={warehouses}
        updateItem={updateItem}
        deleteItem={deleteItem}
        modalErrors={modalErrors}
        success={success}
        setSuccess={setSuccess}
      />
    )
  })

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Warehouse</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { tableElements }
      </tbody>
    </Table>
    </>
  )
}

export default InventoryTable;