import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { UserRegister } from "./components/User/UserRegister";
import { UserLogin } from "./components/User/UserLogin";
import { DashboardLayout } from "./components/DashboardLayout";
import { UserProfile } from "./components/User/UserProfile";
import { UserLogout } from "./components/User/UserLogout";
import { ContactCreate } from "./components/Contact/ContactCreate";
import { ContactList } from "./components/Contact/ContactList";
import { ContactUpdate } from "./components/Contact/ContactUpdate";
import { ContactDetail } from "./components/Contact/ContactDetail";
import { AddressCreate } from "./components/Address/AddressCreate";
import { AddressEdit } from "./components/Address/AddressEdit"
import "./index.css"



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard">
            <Route path="users">
              <Route path="profile" element={<UserProfile />} />
              <Route path="logout" element={<UserLogout />} />
            </Route>
            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="create" element={<ContactCreate />} />
              <Route path=":id">
                <Route index element={<ContactDetail />} />
                <Route path="edit" element={<ContactUpdate />} />
                <Route path="addresses">
                  <Route path="create" element={<AddressCreate />} />
                  <Route path=":addressId/edit" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
