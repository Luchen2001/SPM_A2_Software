import React, { useState } from "react";

const AidCategoryForm = () => {
  const [name, setName] = useState("");
  const [inventoryStatus, setInventoryStatus] = useState("Low");
  const [kitName, setKitName] = useState("");

  const handleSubmitCategory = async (event) => {
    event.preventDefault();

    const newCategory = {
      name,
      inventoryStatus,
    };

    try {
      const categoryResponse = await fetch(
        "http://localhost:8000/update/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        }
      );

      if (categoryResponse.ok) {
        console.log("Aid category successfully created");
        setName("");
        setInventoryStatus("Low");
      } else {
        console.error("Error creating aid category");
      }
    } catch (error) {
      console.error("Error:", error);
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
        const kitResponse = await fetch("http://localhost:8000/update/kits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKit),
        });

        if (kitResponse.ok) {
          console.log("Aid kit successfully created");
          setKitName("");
        } else {
          console.error("Error creating aid kit");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div class="bd-example">
      <h2>Create Aid Category and Kit</h2>
      <form onSubmit={handleSubmitCategory}>
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
          <label>Inventory Status:</label>

          <select
            class="form-control"
            name="inventoryStatus"
            value={inventoryStatus}
            onChange={(e) => setInventoryStatus(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Excess">Excess</option>
          </select>
        </div>
        <br></br>
        <div>
          <button class="btn btn-primary" type="submit">Create Aid Category</button>
        </div>
      </form>
      <br></br>
      <form onSubmit={handleSubmitKit}>
        <div>
          <label>Kit Name:</label>

          <input
            placeholder="Enter Kit Name"
            class="form-control"
            type="text"
            name="kitName"
            value={kitName}
            onChange={(e) => setKitName(e.target.value)}
          />
        </div>
        <br></br>
        <div>
          <button class="btn btn-primary" type="submit">Create Aid Kit</button>
        </div>
      </form>
    </div>
  );
};

export default AidCategoryForm;
