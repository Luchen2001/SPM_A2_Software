import React, { useState } from 'react';

const AidCategoryForm = () => {
  const [name, setName] = useState('');
  const [inventoryStatus, setInventoryStatus] = useState('Low');
  const [kitName, setKitName] = useState('');

  const handleSubmitCategory = async (event) => {
    event.preventDefault();

    const newCategory = {
      name,
      inventoryStatus,
    };

    try {
      const categoryResponse = await fetch('http://localhost:8000/update/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (categoryResponse.ok) {
        console.log('Aid category successfully created');
        setName('');
        setInventoryStatus('Low');
      } else {
        console.error('Error creating aid category');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitKit = async (event) => {
    event.preventDefault();

    if (kitName) {
      const newKit = {
        name: kitName,
        categoryId: 0, // Update this value with the created category ID
      };

      try {
        const kitResponse = await fetch('http://localhost:8000/update/kits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newKit),
        });

        if (kitResponse.ok) {
          console.log('Aid kit successfully created');
          setKitName('');
        } else {
          console.error('Error creating aid kit');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create Aid Category and Kit</h2>
      <form onSubmit={handleSubmitCategory}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Inventory Status:
          <select
            name="inventoryStatus"
            value={inventoryStatus}
            onChange={(e) => setInventoryStatus(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Excess">Excess</option>
          </select>
        </label>
        <button type="submit">Create Aid Category</button>
      </form>
      <form onSubmit={handleSubmitKit}>
        <label>
          Kit Name:
          <input
            type="text"
            name="kitName"
            value={kitName}
            onChange={(e) => setKitName(e.target.value)}
          />
        </label>
        <button type="submit">Create Aid Kit</button>
      </form>
    </div>
  );
};

export default AidCategoryForm;
