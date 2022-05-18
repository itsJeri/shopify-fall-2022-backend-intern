import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable.js';
import InventoryForm from './InventoryForm.js';
import WarehouseForm from './WarehouseForm.js';
import WarehouseTable from './WarehouseTable.js';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [modalErrors, setModalErrors] = useState([]);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Add Item', value: '1'},
    { name: 'Add Warehouse', value: '2'}
  ]

  useEffect(() => {
    // GET //
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
            // Handle client-side warehouse inventory update
            const updatedWarehouses = warehouses.map((warehouse) => {
              if (warehouse.id === newItem.warehouse.id) {
                return {
                  ...warehouse,
                  items_count: warehouse.items_count + 1
                };
              }
              return warehouse;
            })
            setWarehouses(updatedWarehouses);
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
      .then(r => {
        if (r.ok) {
          r.json()
          .then (updatedItem => {
            const updatedItemsArr = items.map((item) => {
              if (item.id === updatedItem.id) {
                return updatedItem;
              }
              return item;
            });
            // Handle client-side warehouse inventory update
            if (item.warehouse.id !== updatedItem.warehouse.id) {
              updateClientWarehouses(item, updatedItem);
            }

            setItems(updatedItemsArr);
            setModalErrors([]);
          })
        } else {
          r.json()
          .then(e => setModalErrors(e.errors));
        }
      })

  }

  function updateClientWarehouses(item, updatedItem) {
    const updatedWarehouses = warehouses.map((warehouse) => {
      if (warehouse.id === item.warehouse.id) {
        return {
          ...warehouse,
          items_count: warehouse.items_count - 1
        };
      }
      if (warehouse.id === updatedItem.warehouse.id) {
        return {
          ...warehouse,
          items_count: warehouse.items_count + 1
        };
      }
      return warehouse;
    })
    setWarehouses(updatedWarehouses);
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
  }

  return (
    <div>
      <div className='data-container'>
        <h2>Warehouses</h2>
        <WarehouseTable 
          warehouses={warehouses}
        />
      </div>
      <div className='data-container'>
        <h2>Inventory</h2>
        <InventoryTable 
          items={items} 
          warehouses={warehouses}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
        {modalErrors ?
          modalErrors.map((error, idx) => {
            return <p key={idx} className='errors'>{error}</p>
          }) : 
          null
        }
      </div>
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