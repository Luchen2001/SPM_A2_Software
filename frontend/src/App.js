import "./App.css";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AidRecipientForm from "./components/AidRecipientForm";
import AidDonorForm from "./components/AidDonorForm";
import DonorOrganizationForm from "./components/DonorOrganizationForm";
import AidCategoryForm from "./components/AidCategoryForm";
import AidItemForm from "./components/AidItemForm";
import RequestByKit from "./components/RequestByKit";
import RequestByCategory from "./components/RequestByCategory";
import ReceiveAidItems from "./components/ReceiveAidItem";
import PersistentDrawerLeft from "./components/SideBar";
import AboutUsPage from "./components/AboutUsPage";

function App() {
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aid-recipinent-form" element={<AidRecipientForm />} />
        <Route path="/aid-donor-form" element={<AidDonorForm />} />
        <Route path="/donor-org-form" element={<DonorOrganizationForm />} />
        <Route path="/category-form" element={<AidCategoryForm />} />
        <Route path="/item-form" element={<AidItemForm />} />
        <Route path="/request-kit" element={<RequestByKit />} />
        <Route path="/request-item" element={<RequestByCategory />} />
        <Route path="/receive-item" element={<ReceiveAidItems />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </div>
  );
}

export default App;
