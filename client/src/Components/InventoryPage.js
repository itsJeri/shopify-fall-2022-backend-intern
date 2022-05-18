import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable.js';
import InventoryForm from './InventoryForm.js';
import WarehouseForm from './WarehouseForm.js';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Add Item', value: '1'},
    { name: 'Add Warehouse', value: '2'}
  ]

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
      .then(r => {
        if (r.ok) {
          r.json()
          .then(newItem => {
            setItems([...items, newItem]);
            setFormErrors([]);
          })
        } else {
          r.json()
          .then(e => setFormErrors(e.errors));
        }
      })
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
      .then(r => {
        if (r.ok) {
          r.json()
          .then(newWarehouse => {
            setWarehouses([...warehouses, newWarehouse]);
            setFormErrors([]);
          })
        } else {
          r.json()
          .then(e => setFormErrors(e.errors));
        }
      })
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
      .catch(err => {setFormErrors(err)})
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
      .catch(err => {setFormErrors(err)});
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
        <ButtonGroup style={{marginBottom: '2rem'}}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type='radio'
              name='radio'
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value)
                setFormErrors([]);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {radioValue === '1' ?
          <InventoryForm warehouses={warehouses} createItem={createItem} formErrors={formErrors} /> :
          <WarehouseForm createWarehouse={createWarehouse} formErrors={formErrors} />
        }
      </div>
    </div>
  )
}

export default InventoryPage;