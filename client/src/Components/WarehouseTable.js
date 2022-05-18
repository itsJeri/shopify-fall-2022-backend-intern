import React from 'react';

import { Table } from 'react-bootstrap';

function WarehouseTable({ warehouses }) {
  const tableElements = warehouses.map((warehouse, idx) => {
    return (
      <tr key={idx}>
        <td>{ warehouse.name }</td>
        <td>{ warehouse.street }</td>
        <td>{ warehouse.city }</td>
        <td>{ warehouse.country }</td>
        <td>{ warehouse.items_count }</td>
      </tr>
    )
  })

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Warehouse</th>
          <th>Street</th>
          <th>City</th>
          <th>Country</th>
          <th># of Items</th>
        </tr>
      </thead>
      <tbody>
        { tableElements }
      </tbody>
    </Table>
    </>
  )
}

export default WarehouseTable;