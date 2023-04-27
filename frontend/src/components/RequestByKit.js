import React, { useState, useEffect } from "react";

const RequestByKit = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [aidKits, setAidKits] = useState([]);
  const [aidItems, setAidItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAidKit, setSelectedAidKit] = useState("");

  useEffect(() => {
    const fetchAidData = async () => {
      const kitsResponse = await fetch("http://localhost:8000/data/kits");
      const kitsData = await kitsResponse.json();
      setAidKits(kitsData);

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

  const handleAidKitChange = (event) => {
    const selectedKitName = event.target.value;
    setSelectedAidKit(selectedKitName);

    const filteredItems = aidItems.filter(
      (item) => item.assignedKit === selectedKitName
    );
    setSelectedItems(filteredItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedRecipient || !selectedAidKit) {
      console.error(
        "Please select a recipient and an aid kit before submitting."
      );
      return;
    }

    const requestData = {
      recipientName: selectedRecipient,
      selectedAidKit: selectedAidKit,
      selectedItems: selectedItems,
    };

    try {
      const response = await fetch("http://localhost:8000/update/request_kit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Request aid data successfully sent to the server");
        // Reset form fields
        setSelectedRecipient("");
        setSelectedAidKit("");
        setSelectedItems([]);
      } else {
        console.error("Error sending request aid data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>Request Aid</h2>
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
          <label>Choose an aid kit:</label>

          <select
            class="form-control"
            value={selectedAidKit}
            onChange={handleAidKitChange}
          >
            <option value="">Choose...</option>
            {aidKits.map((kit) => (
              <option key={kit.categoryId} value={kit.name}>
                {kit.name}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div>
          <button
            class="btn btn-primary"
            type="submit"
            disabled={!selectedRecipient || !selectedAidKit}
          >
            Submit
          </button>
        </div>
      </form>
      {selectedItems.length > 0 && (
        <div>
          <h3>Items in the selected kit:</h3>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.name}>
                {Object.entries(item)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" - ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RequestByKit;
