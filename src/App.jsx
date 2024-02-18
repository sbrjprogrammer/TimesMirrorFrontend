// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('/items');
    console.log(response.data)
    setItems(response.data.items);
  };

  const addItem = async () => {
    await axios.post('/items', { name: newItem });
    setNewItem('');
    fetchItems();
  };

  const editItem = async (id, newName) => {
    await axios.put(`/items/${id}`, { name: newName });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`/items/${id}`);
    fetchItems();
  };

  return (
    <div className="container">
    <h1>Item List</h1>
    <ul>
      {items?.map((item) => (
        <li key={item._id}>
          {item.name}
          <div className="button-container">
            <button onClick={() => editItem(item._id, prompt('Edit item:', item.name))}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    <div className="add-item-container">
      <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
    </div>
  </div>
  );
}

export default App;
