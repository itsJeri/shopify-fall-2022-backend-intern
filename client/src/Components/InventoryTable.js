import { useState, useEffect } from 'react';
import TableRow from './TableRow';

import { Table, Button } from 'react-bootstrap';

function InventoryTable({ items, warehouses, updateItem, deleteItem }) {
  
  const tableElements = items.map((item, idx) => {
    return (
      <TableRow 
        key={idx}
        item={item}
        warehouses={warehouses}
        idx={idx}
        updateItem={updateItem}
        deleteItem={deleteItem}
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