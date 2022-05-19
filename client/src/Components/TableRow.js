import { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

import { Button } from 'react-bootstrap';

function TableRow({ item, warehouses, updateItem, deleteItem, modalErrors, success, setSuccess }) {
  // Modal Handlers
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleClose = () => { 
    setShow(false);
    setIsDelete(false);
    setSuccess(false);
  }
  const handleShow = () => setShow(true);

  return (
    <>
    <tr key={item.id}>
      <td>{ item.name }</td>
      <td>{ item.description }</td>
      <td>{ item.warehouse.name }</td>
      <td><Button onClick={handleShow}> Edit </Button></td>
    </tr>

    {isDelete ?
      <DeleteModal 
        show={show}
        handleClose={handleClose}
        item={item}
        deleteItem={deleteItem}
      /> :
      <EditModal 
        show={show} 
        handleClose={handleClose} 
        item={item}
        warehouses={warehouses}
        setIsDelete={setIsDelete}
        updateItem={updateItem}
        modalErrors={modalErrors}
        success={success}
        setSuccess={setSuccess}
      />
    }
    </>
  )
}

export default TableRow;