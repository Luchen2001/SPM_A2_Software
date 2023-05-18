import React, { useState } from "react";
import { useEffect } from "react";
import SuccessBar from "./SuccessBar";

const AidItemForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assignedKit, setAssignedKit] = useState("");
  const [categories, setCategories] = useState([]);
  const [kits, setKits] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("food");
  const [expiryDate, setExpiryDate] = useState(""); // new state for expiry date input
  const [mainIngredients, setMainIngredients] = useState("");
  const [allergenInfo, setAllergenInfo] = useState("");

  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://3.27.106.167:8000/data/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCategories();

    async function fetchKits() {
      try {
        const response = await fetch("http://3.27.106.167:8000/data/kits");
        const data = await response.json();
        setKits(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCategories();
    fetchKits();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // check if the category contains the word "Food"
    if (e.target.value.toLowerCase().includes("food")) {
      // if yes, render an expiry date input field
      setType("food");
    } else if (e.target.value.toLowerCase().includes("clothing")) {
      // if not, remove expiry date input field
      setType("clothing");
    } else {
      setType("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItem = {
      name,
      category,
      quantity,
      assignedKit,
      ...(type !== "" && { type }),
      ...(type === "food" && { expiryDate, mainIngredients, allergenInfo }), // add food properties conditionally
      ...(type === "clothing" && { size, brand }), // add clothing properties conditionally
    };

    try {
      const response = await fetch("http://3.27.106.167:8000/update/aid_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setShow(true);
        console.log("Aid item successfully created");
        setName("");
        setCategory("");
        setQuantity("");
        setAssignedKit("");
      } else {
        console.error("Error creating aid item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>Create Aid Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            class="form-control"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            Category:
          </label>

          <select
            class="form-control"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>

          <input
            placeholder="Enter Quantity"
            class="form-control"
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Assigned Kit:</label>
          <select
            class="form-control"
            name="assignedKit"
            value={assignedKit}
            onChange={(e) => setAssignedKit(e.target.value)}
          >
            <option value="">None</option>
            {kits.map((kit, index) => (
              <option key={index} value={kit.name}>
                {kit.name}
              </option>
            ))}
          </select>
        </div>

        {type === "food" && (
          <>
            <div>
              <label>Expiry Date:</label>

              <input
                placeholder="Enter Expiry Date"
                class="form-control"
                type="date"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label>Main Ingredients:</label>

              <input
                placeholder="Enter Main Ingredients"
                class="form-control"
                type="text"
                name="mainIngredients"
                value={mainIngredients}
                onChange={(e) => setMainIngredients(e.target.value)}
              />
            </div>
            <div>
              <label>Allergen Information:</label>

              <input
                placeholder="Enter Allergen Information"
                class="form-control"
                type="text"
                name="allergenInfo"
                value={allergenInfo}
                onChange={(e) => setAllergenInfo(e.target.value)}
              />
            </div>
          </>
        )}

        {type === "clothing" && (
          <>
            <label>Size:</label>

            <select
              class="form-control"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <label>Brand:</label>

            <input
              placeholder="Enter Brand"
              class="form-control"
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </>
        )}
        <br></br>
        <div>
          <button class="btn btn-primary" type="submit">
            Create Aid Item
          </button>
        </div>
        <br></br>
        <div>
          <SuccessBar show={show} setShow={setShow} />
        </div>
      </form>
    </div>
  );
};

export default AidItemForm;
