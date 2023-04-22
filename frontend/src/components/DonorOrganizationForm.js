import React, { useState } from 'react';

const DonorOrganizationForm = () => {
  const initialOrganizationInfo = {
    name: '',
    headquartersAddress: '',
    contactPerson: '',
    abn: '',
  };

  const [organizationInfo, setOrganizationInfo] = useState(initialOrganizationInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/update/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizationInfo),
      });

      if (response.ok) {
        console.log('Organization data successfully sent to the server');
        setOrganizationInfo(initialOrganizationInfo);
      } else {
        console.error('Error sending organization data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Donor Organization Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Organization Name:
          <input
            type="text"
            name="name"
            value={organizationInfo.name}
            onChange={(e) =>
              setOrganizationInfo({ ...organizationInfo, name: e.target.value })
            }
          />
        </label>
        <label>
          Headquarters Address:
          <input
            type="text"
            name="headquartersAddress"
            value={organizationInfo.headquartersAddress}
            onChange={(e) =>
              setOrganizationInfo({ ...organizationInfo, headquartersAddress: e.target.value })
            }
          />
        </label>
        <label>
          Principal Contact Person:
          <input
            type="text"
            name="contactPerson"
            value={organizationInfo.contactPerson}
            onChange={(e) =>
              setOrganizationInfo({ ...organizationInfo, contactPerson: e.target.value })
            }
          />
        </label>
        <label>
          Australian Business Number (ABN):
          <input
            type="text"
            name="abn"
            value={organizationInfo.abn}
            onChange={(e) =>
              setOrganizationInfo({ ...organizationInfo, abn: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DonorOrganizationForm;
