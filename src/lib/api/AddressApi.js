export const createAddress = async (token, id, { street, city, province, country, postal_code }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json",
      'Authorization': token,
    },
    body: JSON.stringify({
      street,
      city,
      province,
      country,
      postal_code,
    }),
  });
};
export const updateAddress = async (token, id, {addressId, street, city, province, country, postal_code }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json",
      'Authorization': token,
    },
    body: JSON.stringify({
      street,
      city,
      province,
      country,
      postal_code,
    }),
  });
};
export const getAddress = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
    method: "GET",
    headers: {
      'Accept': "application/json",
      'Authorization': token,
    },
  });
};

export const deleteAddress = async (token, id, addressId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      'Accept': "application/json",
      'Authorization': token,
    },
  });
};
export const addressDetail = async (token, id, addressId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: "GET",
    headers: {
      'Accept': "application/json",
      'Authorization': token,
    },
  });
};
