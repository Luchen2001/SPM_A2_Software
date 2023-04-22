import React, { useState } from 'react';

const AidRecipientForm = () => {
    const initialGeneralInfo = {
        name: '',
        age: '',
        previousAddress: '',
        totalFamilyMembers: '',
        partnerName: '',
        partnerAge: '',
      };
      const initialPrivateInfo = {
        nationality: '',
        id1: '',
        expiry1: '',
        id2: '',
        expiry2: '',
        id3: '',
        expiry3: '',
        uploadedFiles: [],
      };
      const [generalInfo, setGeneralInfo] = useState(initialGeneralInfo);
      const [privateInfo, setPrivateInfo] = useState(initialPrivateInfo);

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
      const response = await fetch('http://localhost:8000/update/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        console.log('Data successfully sent to the server');
        setGeneralInfo(initialGeneralInfo);
        setPrivateInfo(initialPrivateInfo);
      } else {
        console.error('Error sending data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>General Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={generalInfo.name}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, name: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={generalInfo.age}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, age: e.target.value })
            }
          />
        </label>
        <label>
          Previous Address:
          <input
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
        </label>
        <label>
          Total Family Members:
          <input
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
        </label>
        <label>
          Common Law Partner Name:
          <input
            type="text"
            name="partnerName"
            value={generalInfo.partnerName}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, partnerName: e.target.value })
            }
          />
        </label>
        <label>
          Common Law Partner Age:
          <input
            type="number"
            name="partnerAge"
            value={generalInfo.partnerAge}
            onChange={(e) =>
              setGeneralInfo({ ...generalInfo, partnerAge: e.target.value })
            }
          />
        </label>

      <h2>Private Information</h2>
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={privateInfo.nationality}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, nationality: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 1:
          <input
            type="text"
            name="id1"
            value={privateInfo.id1}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id1: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 1:
          <input
            type="date"
            name="expiry1"
            value={privateInfo.expiry1}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry1: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 2:
          <input
            type="text"
            name="id2"
            value={privateInfo.id2}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id2: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 2:
          <input
            type="date"
            name="expiry2"
            value={privateInfo.expiry2}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry2: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 3:
          <input
            type="text"
            name="id3"
            value={privateInfo.id3}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, id3: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 3:
          <input
            type="date"
            name="expiry3"
            value={privateInfo.expiry3}
            onChange={(e) =>
              setPrivateInfo({ ...privateInfo, expiry3: e.target.value })
            }
          />
        </label>
        <label>
          Upload Identity Documents:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};
export default AidRecipientForm;