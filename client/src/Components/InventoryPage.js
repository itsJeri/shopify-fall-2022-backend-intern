import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable.js';
import InventoryForm from './InventoryForm.js';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch('/items')
      .then(r => r.json())
      .then(items => {
        setItems(items)
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
      .then(r => {
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
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
      <div id='item-form-container'>
       <InventoryForm createItem={createItem}/>
      </div>
    </div>
  )
}

export default InventoryPage;