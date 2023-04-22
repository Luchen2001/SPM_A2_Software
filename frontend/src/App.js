import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AidRecipientForm from './components/AidRecipientForm'
import AidDonorForm from './components/AidDonorForm';
import DonorOrganizationForm from './components/DonorOrganizationForm';
import AidCategoryForm from './components/AidCategoryForm';
import AidItemForm from './components/AidItemForm';
import RequestByKit from './components/RequestByKit';
import RequestByCategory from './components/RequestByCategory';
import ReceiveAidItems from './components/ReceiveAidItem';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aid-recipinent-form">Aid Recipient Detail</Link>
          </li>
          <li>
            <Link to="/aid-donor-form">Individual Aid Donor Detail</Link>
          </li>
          <li>
            <Link to="/donor-org-form">Organization Aid Donor Detail</Link>
          </li>
          <li>
            <Link to="/category-form">Aid Category</Link>
          </li>
          <li>
            <Link to="/item-form">Aid Item</Link>
          </li>
          <li>
            <Link to="/request-kit">Request Kit</Link>
          </li>
          <li>
            <Link to="/request-item">Request Item</Link>
          </li>
          <li>
            <Link to="/receive-item">Receive Item</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aid-recipinent-form" element={<AidRecipientForm />} />
        <Route path="/aid-donor-form" element={<AidDonorForm />} />
        <Route path="/donor-org-form" element={<DonorOrganizationForm />} />
        <Route path="/category-form" element={<AidCategoryForm/>} />
        <Route path="/item-form" element={<AidItemForm/>} />
        <Route path="/request-kit" element={<RequestByKit/>} />
        <Route path="/request-item" element={<RequestByCategory/>} />
        <Route path="/receive-item" element={<ReceiveAidItems/>} />
      </Routes>
    </div>
  );
}

export default App;
