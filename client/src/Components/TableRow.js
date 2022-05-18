import { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

import { Button } from 'react-bootstrap';

function TableRow({ item, idx, updateItem, deleteItem }) {
  // Modal Handlers
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleClose = () => { 
    setShow(false);
    setIsDelete(false);
  }
  const handleShow = () => setShow(true);

  return (
    <>
    <tr key={idx}>
      <td>{ idx + 1 }</td>
      <td>{ item.name }</td>
      <td>{ item.description }</td>
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
        setIsDelete={setIsDelete}
        updateItem={updateItem}
      />
    }
    </>
  )
}

export default TableRow;