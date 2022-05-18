import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable.js';
import InventoryForm from './InventoryForm.js';
import WarehouseForm from './WarehouseForm.js';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch('/items')
      .then(r => r.json())
      .then(items => {
        setItems(items)
      })
    
    fetch('/warehouses')
      .then(r => r.json())
      .then(warehouses => {
        setWarehouses(warehouses)
        console.log(warehouses)
      })
  }, [])

  // POST //
  function createItem(e, newItem) {
    e.preventDefault();
    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem)
    })
      .then(r => r.json())
      .then(newItem => {
        setItems([...items, newItem]);
        setErrors([]);
      })
      .catch(err => {setErrors(err)});
  }

  function createWarehouse(e, newWarehouse) {
    e.preventDefault();
    fetch('/warehouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWarehouse)
    })
      .then(r => r.json())
      .then(newWarehouse => {
        setWarehouses([...warehouses, newWarehouse]);
        setErrors([]);
      })
      .catch(err => {setErrors(err)});
  }

  // PATCH //
  function updateItem(e, item, updatedItem) {
    e.preventDefault();
    fetch(`/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(r => r.json())
      .then (updatedItem => {
        const updatedItemsArr = items.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        });
        setItems(updatedItemsArr);
      })
      .catch(err => {setErrors(err)})
  }

  // DELETE //
  function deleteItem(item) {
    fetch(`/items/${item.id}`, {
      method: 'DELETE',
    })
      .then(r => {
        const updatedItemsArr = items.filter(({ id }) => id !== item.id);
        setItems(updatedItemsArr);
      })
      .catch(err => {setErrors(err)});
  }

  return (
    <div>
      <InventoryTable 
        items={items} 
        warehouses={warehouses}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
      <div id='item-form-container'>
        <InventoryForm warehouses={warehouses} createItem={createItem}/>
        <WarehouseForm createWarehouse={createWarehouse} />
      </div>
    </div>
  )
}

export default InventoryPage;