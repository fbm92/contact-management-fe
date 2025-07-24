import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { detailContactId } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { addressDetail, updateAddress } from "../../lib/api/AddressApi";
import { AddressForm } from "../Form/AddressForm";

export const AddressEdit = () => {
  const { id, addressId } = useParams();
  const [token, _] = useLocalStorage("token", "");
  const [contact, setContact] = useState({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    const response = await updateAddress(token, id, { addressId, street, city, province, country, postal_code });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Data Berhasil Diubah");
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function fetchAddress() {
    const response = await addressDetail(token, id, addressId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setStreet(responseBody.data.street);
      setCity(responseBody.data.city);
      setProvince(responseBody.data.province);
      setCountry(responseBody.data.country);
      setPostalCode(responseBody.data.postal_code);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function fetchContact() {
    const response = await detailContactId(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() => console.log("fetch detail contact"));
    fetchAddress().then(() => console.log("fetch detail address"));
  });

  return (
    <>
      <>
        <div className="flex items-center mb-6">
          <Link to={`/dashboard/contacts/${id}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit Address
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            {/* Contact Information */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {contact.first_name} {contact.last_name}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {contact.email} • {contact.phone}
                  </p>
                </div>
              </div>
            </div>
            <AddressForm id={id} addressId={addressId} handleSubmit={handleSave} street={street} city={city} country={country} province={province} postal_code={postal_code} setStreet={setStreet} setCity={setCity} setProvince={setProvince} setCountry={setCountry} setPostalCode={setPostalCode} />
          </div>
        </div>
      </>
    </>
  );
};
