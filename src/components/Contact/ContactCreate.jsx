import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { createContact } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { userDetail } from "../../lib/api/UserApi";
import { ContactForm } from "../Form/ContactForm";

export const ContactCreate = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await userDetail(token);
    const responseBody = await response.json();

    if (response.status === 200) {
      const response = await createContact(token, { first_name, last_name, email, phone });
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        await alertSuccess("Create Contact Successfully");
        await navigate({
          pathname: "/dashboard/contacts",
        });
      } else {
        await alertError(responseBody.errors);
      }
    } else {
      await alertError(responseBody.errors);
      setToken("");
      await navigate({
        pathname: "/login",
      });
    }
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
          <i className="fas fa-arrow-left mr-2" /> Back to Contacts
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New Contact
        </h1>
      </div>
      <ContactForm first_name={first_name} last_name={last_name} email={email} phone={phone} setFirstname={setFirstname} setLastname={setLastname} setEmail={setEmail} setPhone={setPhone} handleSubmit={handleSubmit} />
    </>
  );
};
