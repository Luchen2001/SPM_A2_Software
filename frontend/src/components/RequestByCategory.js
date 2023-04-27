import React, { useState, useEffect } from "react";

const RequestByCategory = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [aidItems, setAidItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchAidData = async () => {
      const categoriesResponse = await fetch(
        "http://localhost:8000/data/categories"
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      const itemsResponse = await fetch("http://localhost:8000/data/aid_items");
      const itemsData = await itemsResponse.json();
      setAidItems(itemsData);

      const recipientsResponse = await fetch(
        "http://localhost:8000/data/recipients"
      );
      const recipientsData = await recipientsResponse.json();
      setRecipients(recipientsData);
    };
    fetchAidData();
  }, []);

  const handleRecipientChange = (event) => {
    setSelectedRecipient(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;
    setSelectedCategory(selectedCategoryName);

    const filteredItems = aidItems.filter(
      (item) => item.category === selectedCategoryName
    );
    setSelectedItems(filteredItems);
  };

  const handleItemQuantityChange = (index, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedItems((prevState) => {
      const newItems = [...prevState];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      recipientName: selectedRecipient,
      selectedCategory: selectedCategory,
      selectedItems: selectedItems.filter((item) => item.quantity > 0),
      notes: notes,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/update/request_by_category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log("Request aid data successfully sent to the server");
        setSelectedRecipient("");
        setSelectedCategory("");
        setSelectedItems([]);
        setNotes("");
      } else {
        console.error("Error sending request aid data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>Request Aid by Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose a recipient:</label>
          <select
            class="form-control"
            value={selectedRecipient}
            onChange={handleRecipientChange}
          >
            <option value="">Choose...</option>
            {recipients.map((recipient) => (
              <option
                key={recipient.generalInfo.name}
                value={recipient.generalInfo.name}
              >
                {recipient.generalInfo.name}
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
              <option key={category.categoryId} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedItems.length > 0 && (
          <div>
            <h3>Items in the selected category:</h3>
            {selectedItems.map((item, index) => (
              <div key={item.itemId}>
                <span>{item.name}</span>
                <label>
                  Quantity:
                  <input
                    placeholder="Enter Quantity"
                    class="form-control"
                    type="number"
                    value={item.quantity || ""}
                    onChange={(event) => handleItemQuantityChange(index, event)}
                    min="0"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
        <label>Notes:</label>

        <textarea
          class="form-control"
          value={notes}
          onChange={handleNotesChange}
        />
        <br></br>
        <div>
          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestByCategory;
