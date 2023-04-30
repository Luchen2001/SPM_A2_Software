import React, { useState } from "react";
import SuccessBar from "./SuccessBar";

const AidRecipientForm = () => {
  const initialGeneralInfo = {
    name: "",
    age: "",
    previousAddress: "",
    totalFamilyMembers: "",
    partnerName: "",
    partnerAge: "",
  };
  const initialPrivateInfo = {
    nationality: "",
    id1: "",
    expiry1: "",
    id2: "",
    expiry2: "",
    id3: "",
    expiry3: "",
    uploadedFiles: [],
  };
  const [generalInfo, setGeneralInfo] = useState(initialGeneralInfo);
  const [privateInfo, setPrivateInfo] = useState(initialPrivateInfo);
  const [show, setShow] = useState(false);

  const handleFileUpload = (event) => {
    /*
        setPrivateInfo({
        ...privateInfo,
        uploadedFiles: [...privateInfo.uploadedFiles, ...event.target.files],
        });
        */
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const combinedData = { generalInfo, privateInfo };

    try {
      const response = await fetch("http://localhost:8000/update/recipients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        setShow(true);
        console.log("Data successfully sent to the server");
        setGeneralInfo(initialGeneralInfo);
        setPrivateInfo(initialPrivateInfo);
      } else {
        console.error("Error sending data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>General Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            class="form-control"
            name="name"
            value={generalInfo.name}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            placeholder="Enter Age"
            class="form-control"
            type="number"
            name="age"
            value={generalInfo.age}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, age: e.target.value })
            }
          />
        </div>
        <div>
          <label>Previous Address:</label>
          <input
            placeholder="Enter Address"
            class="form-control"
            type="text"
            name="previousAddress"
            value={generalInfo.previousAddress}
            onChange={(e) =>
              setGeneralInfo({
                ...generalInfo,
                previousAddress: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Total Family Members:</label>
          <input
            placeholder="Enter Total Family Members"
            class="form-control"
            type="number"
            name="totalFamilyMembers"
            value={generalInfo.totalFamilyMembers}
            onChange={(e) =>
              setGeneralInfo({
                ...generalInfo,
                totalFamilyMembers: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Common Law Partner Name:</label>
          <input
            placeholder="Enter Common Law Partner Name"
            class="form-control"
            type="text"
            name="partnerName"
            value={generalInfo.partnerName}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, partnerName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Common Law Partner Age:</label>
          <input
            placeholder="Enter Common Law Partner Age"
            class="form-control"
            type="number"
            name="partnerAge"
            value={generalInfo.partnerAge}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, partnerAge: e.target.value })
            }
          />
        </div>
        <br></br>
        <h2>Private Information</h2>
        <div>
          <label>Nationality:</label>
          <input
            placeholder="Enter Nationality"
            class="form-control"
            type="text"
            name="nationality"
            value={privateInfo.nationality}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, nationality: e.target.value })
            }
          />
        </div>
        <div>
          <label>Identity Document 1:</label>
          <input
            placeholder="Enter Identity Document 1"
            class="form-control"
            type="text"
            name="id1"
            value={privateInfo.id1}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id1: e.target.value })
            }
          />
        </div>
        <div>
          <label>Expiry Date 1:</label>
          <input
            placeholder="Enter Expiry Date 1"
            class="form-control"
            type="date"
            name="expiry1"
            value={privateInfo.expiry1}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry1: e.target.value })
            }
          />
        </div>
        <div>
          <label>Identity Document 2:</label>
          <input
            placeholder="Enter Identity Document 2"
            class="form-control"
            type="text"
            name="id2"
            value={privateInfo.id2}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id2: e.target.value })
            }
          />
        </div>
        <div>
          <label>Expiry Date 2:</label>
          <input
            placeholder="Enter Expiry Date 2"
            class="form-control"
            type="date"
            name="expiry2"
            value={privateInfo.expiry2}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry2: e.target.value })
            }
          />
        </div>
        <div>
          <label>Identity Document 3:</label>
          <input
            placeholder="Enter Identity Document 3"
            class="form-control"
            type="text"
            name="id3"
            value={privateInfo.id3}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id3: e.target.value })
            }
          />
        </div>
        <div>
          <label>Expiry Date 3:</label>
          <input
            placeholder="Enter Expiry Date 3"
            class="form-control"
            type="date"
            name="expiry3"
            value={privateInfo.expiry3}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry3: e.target.value })
            }
          />
        </div>
        <div>
          <label>Upload Identity Documents:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
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
    </div>
  );
};
export default AidRecipientForm;
