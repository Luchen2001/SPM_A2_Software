import React, { useState } from "react";
import SuccessBar from "./SuccessBar";

const DonorOrganizationForm = () => {
  const [show, setShow] = useState(false);

  const initialOrganizationInfo = {
    name: "",
    headquartersAddress: "",
    contactPerson: "",
    abn: "",
  };

  const [organizationInfo, setOrganizationInfo] = useState(
    initialOrganizationInfo
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://3.27.106.167:8000/update/organizations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(organizationInfo),
        }
      );

      if (response.ok) {
        setShow(true);
        console.log("Organization data successfully sent to the server");
        setOrganizationInfo(initialOrganizationInfo);
      } else {
        console.error("Error sending organization data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="bd-example">
      <h2>Donor Organization Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Organization Name:</label>
          <input
            placeholder="Enter Organization Name"
            class="form-control"
            type="text"
            name="name"
            value={organizationInfo.name}
            onChange={(e) =>
              setOrganizationInfo({
                ...organizationInfo,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Headquarters Address:</label>
          <input
            placeholder="Enter Headquarters Address"
            class="form-control"
            type="text"
            name="headquartersAddress"
            value={organizationInfo.headquartersAddress}
            onChange={(e) =>
              setOrganizationInfo({
                ...organizationInfo,
                headquartersAddress: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Principal Contact Person:</label>
          <input
            placeholder="Enter Principal Contact Person"
            class="form-control"
            type="text"
            name="contactPerson"
            value={organizationInfo.contactPerson}
            onChange={(e) =>
              setOrganizationInfo({
                ...organizationInfo,
                contactPerson: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Australian Business Number (ABN):</label>
          <input
            placeholder="Enter Australian Business Number (ABN)"
            class="form-control"
            type="text"
            name="abn"
            value={organizationInfo.abn}
            onChange={(e) =>
              setOrganizationInfo({
                ...organizationInfo,
                abn: e.target.value,
              })
            }
          />
        </div>
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
    </div>
  );
};

export default DonorOrganizationForm;
