import React, { useState } from 'react';

const AidDonorForm = () => {
  const initialDonorInfo = {
    name: '',
    age: '',
    mailingAddress: '',
    phoneNumber: '',
    email: '',
    preferredCommunication: '',
    nationality: '',
    id1: '',
    expiry1: '',
    id2: '',
    expiry2: '',
    id3: '',
    expiry3: '',
  };

  const [donorInfo, setDonorInfo] = useState(initialDonorInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/update/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorInfo),
      });

      if (response.ok) {
        console.log('Donor data successfully sent to the server');
        setDonorInfo(initialDonorInfo);
      } else {
        console.error('Error sending donor data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Aid Donor Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={donorInfo.name}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, name: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={donorInfo.age}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, age: e.target.value })
            }
          />
        </label>
        <label>
          Mailing Address:
          <input
            type="text"
            name="mailingAddress"
            value={donorInfo.mailingAddress}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, mailingAddress: e.target.value })
            }
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={donorInfo.phoneNumber}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, phoneNumber: e.target.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={donorInfo.email}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, email: e.target.value })
            }
          />
        </label>
        <label>
          Preferred Communication:
          <select
            name="preferredCommunication"
            value={donorInfo.preferredCommunication}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, preferredCommunication: e.target.value })
            }
          >
            <option value="">Choose...</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </label>
        <h2>Private Information</h2>
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={donorInfo.nationality}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, nationality: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 1:
          <input
            type="text"
            name="id1"
            value={donorInfo.id1}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id1: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 1:
          <input
            type="date"
            name="expiry1"
            value={donorInfo.expiry1}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry1: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 2:
          <input
            type="text"
            name="id2"
            value={donorInfo.id2}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id2: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 2:
          <input
            type="date"
            name="expiry2"
            value={donorInfo.expiry2}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry2: e.target.value })
            }
          />
        </label>
        <label>
          Identity Document 3:
          <input
            type="text"
            name="id3"
            value={donorInfo.id3}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, id3: e.target.value })
            }
          />
        </label>
        <label>
          Expiry Date 3:
          <input
            type="date"
            name="expiry3"
            value={donorInfo.expiry3}
            onChange={(e) =>
              setDonorInfo({ ...donorInfo, expiry3: e.target.value })
            }
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AidDonorForm;
