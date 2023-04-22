import React, { useState } from 'react';
import { useEffect } from 'react';

const AidItemForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [assignedKit, setAssignedKit] = useState('');
  const [categories, setCategories] = useState([]);
  const [kits, setKits] = useState([]);

  const [type, setType] = useState('food')

  const [expiryDate, setExpiryDate] = useState(''); // new state for expiry date input
  const [mainIngredients, setMainIngredients] = useState('');
  const [allergenInfo, setAllergenInfo] = useState('');

  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8000/data/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchCategories();

    async function fetchKits() {
        try {
          const response = await fetch('http://localhost:8000/data/kits');
          const data = await response.json();
          setKits(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchCategories();
      fetchKits();
  }, []);

  const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        // check if the category contains the word "Food"
        if (e.target.value.toLowerCase().includes('food')) {
            // if yes, render an expiry date input field
            setType('food');
        }
        else if (e.target.value.toLowerCase().includes('clothing')) {
            // if not, remove expiry date input field
            setType('clothing')
        }else{
            setType('')
        }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      name,
      category,
      quantity,
      assignedKit,
      ...(type !== '' && {type}),
      ...(type === 'food' && { expiryDate, mainIngredients, allergenInfo }), // add food properties conditionally
      ...(type === 'clothing' && { size, brand }), // add clothing properties conditionally
    };

    try {
      const response = await fetch('http://localhost:8000/update/aid_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Aid item successfully created');
        setName('');
        setCategory('');
        setQuantity('');
        setAssignedKit('');
      } else {
        console.error('Error creating aid item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Aid Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label name = 'category' value={category} onChange={(e) => setCategory(e.target.value)}>
          Category:
          <select name="category" value={category} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Assigned Kit:
          <select name="assignedKit" value={assignedKit} onChange={(e) => setAssignedKit(e.target.value)}>
            <option value="">None</option>
            {kits.map((kit, index) => (
              <option key={index} value={kit.name}>
                {kit.name}
              </option>
            ))}
          </select>
         </label>

        
         {type === 'food' && (
            <>
                <label>
                Expiry Date:
                <input
                    type="date"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
                </label>
                <label>
                Main Ingredients:
                <input
                    type="text"
                    name="mainIngredients"
                    value={mainIngredients}
                    onChange={(e) => setMainIngredients(e.target.value)}
                />
                </label>
                <label>
                Allergen Information:
                <input
                    type="text"
                    name="allergenInfo"
                    value={allergenInfo}
                    onChange={(e) => setAllergenInfo(e.target.value)}
                />
                </label>
            </>
        )}

        {type === 'clothing' && (
            <>
                <label>
                Size:
                    <select name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </label>
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </label>
                
            </>
        )}


        <button type="submit">Create Aid Item</button>
      </form>
    </div>
  );
};

export default AidItemForm;
