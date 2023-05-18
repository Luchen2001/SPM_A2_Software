import React, { useState } from "react";
import SuccessBar from "./SuccessBar";

const AidDonorForm = () => {
  const initialDonorInfo = {
    name: "",
    age: "",
    mailingAddress: "",
    phoneNumber: "",
    email: "",
    preferredCommunication: "",
    nationality: "",
    id1: "",
    expiry1: "",
    id2: "",
    expiry2: "",
    id3: "",
    expiry3: "",
  };

  const [donorInfo, setDonorInfo] = useState(initialDonorInfo);
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
    try {
      const response = await fetch("http://3.27.106.167:8000/update/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorInfo),
      });

      if (response.ok) {
        console.log("Donor data successfully sent to the server");
        setDonorInfo(initialDonorInfo);
        setShow(true);
      } else {
        console.error("Error sending donor data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>Aid Donor Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            class="form-control"
            type="text"
            name="name"
            value={donorInfo.name}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, name: e.target.value })
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
            value={donorInfo.age}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, age: e.target.value })
            }
          />
        </div>
        <div>
          <label>Mailing Address:</label>
          <input
            placeholder="Enter Mailing Address"
            class="form-control"
            type="text"
            name="mailingAddress"
            value={donorInfo.mailingAddress}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, mailingAddress: e.target.value })
            }
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            placeholder="Enter Phone Number"
            class="form-control"
            type="tel"
            name="phoneNumber"
            value={donorInfo.phoneNumber}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, phoneNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            placeholder="Enter Email"
            class="form-control"
            type="email"
            name="email"
            value={donorInfo.email}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Preferred Communication:</label>

          <select
            class="form-control"
            name="preferredCommunication"
            value={donorInfo.preferredCommunication}
            onChange={(e) =>
              setDonorInfo({
                ...donorInfo,
                preferredCommunication: e.target.value,
              })
            }
          >
            <option value="">Choose...</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
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
            value={donorInfo.nationality}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, nationality: e.target.value })
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
            value={donorInfo.id1}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id1: e.target.value })
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
            value={donorInfo.expiry1}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry1: e.target.value })
            }
          />
        </div>
        <div>
          <label>Upload Identity Document1:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label>Identity Document 2:</label>
          <input
            placeholder="Enter Identity Document 2"
            class="form-control"
            type="text"
            name="id2"
            value={donorInfo.id2}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id2: e.target.value })
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
            value={donorInfo.expiry2}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry2: e.target.value })
            }
          />
        </div>
        <div>
          <label>Upload Identity Document2:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label>Identity Document 3:</label>

          <input
            placeholder="Enter Identity Document 3"
            class="form-control"
            type="text"
            name="id3"
            value={donorInfo.id3}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id3: e.target.value })
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
            value={donorInfo.expiry3}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry3: e.target.value })
            }
          />
        </div>
        <div>
          <label>Upload Identity Document3:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <br></br>
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
        <br></br>
        <br></br>
        <div>
          <SuccessBar show={show} setShow={setShow} />
        </div>
      </form>
    </div>
  );
};

export default AidDonorForm;
