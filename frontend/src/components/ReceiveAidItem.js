import React, { useState, useEffect } from "react";
import SuccessBar from "./SuccessBar";

const ReceiveAidItems = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [show, setShow] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const donorsResponse = await fetch("http://localhost:8000/data/donors");
      const donorsData = await donorsResponse.json();
      setDonors(donorsData);

      const categoriesResponse = await fetch(
        "http://localhost:8000/data/categories"
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const itemsResponse = await fetch("http://localhost:8000/data/aid_items");
      const itemsData = await itemsResponse.json();
      setItems(itemsData);
    };

    fetchData();
  }, []);

  const handleDonorChange = (event) => {
    setSelectedDonor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const receivedItems = {
      donorName: selectedDonor,
      items: selectedItems,
      notes: notes,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/update/receive_aid_items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(receivedItems),
        }
      );

      if (response.ok) {
        setShow(true);
        console.log("Received aid items successfully sent to the server");
        setSelectedDonor("");
        setSelectedItems([]);
      } else {
        console.error("Error sending received aid items to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div class="bd-example">
      <h2>Receive Aid Items</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose a donor:</label>

          <select
            class="form-control"
            value={selectedDonor}
            onChange={handleDonorChange}
          >
            <option value="">Choose...</option>
            {donors.map((donor) => (
              <option key={donor.name} value={donor.name}>
                {donor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Choose a category:</label>
          <select
            class="form-control"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Choose...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleItemClick(item)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </ul>
        <label>Notes:</label>
        <textarea
          class="form-control"
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
        <br></br>
        <div>
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
        <br></br>
        <div>
          <SuccessBar show={show} setShow={setShow} />
        </div>
      </form>

      {selectedItems.length > 0 && (
        <div>
          <h3>Selected items:</h3>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReceiveAidItems;
