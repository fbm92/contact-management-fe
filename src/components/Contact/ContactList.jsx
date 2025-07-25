import { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { deleteContact, listContact } from "../../lib/api/ContactApi";
import { alertConfirm, alertError } from "../../lib/alert";
import { Link, useNavigate } from "react-router";
import { ContactCard } from "../card/ContactCard";

export const ContactList = () => {
  const [token, _] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const handleSearchForm = async (e) => {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  };

  const handlePage = async (page) => {
    setPage(page);
    setReload(!reload);
  };

  const handleDeleteContact = async (id) => {
    if (!(await alertConfirm("Are you sure ?"))) {
      return;
    }

    const response = await deleteContact(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setPage(1);
      setReload(!reload);
    } else {
      await alertError(responseBody.errors);
    }
  };

  function getPages() {
    const pages = [];
    for (let index = 1; index <= totalPage; index++) {
      pages.push(index);
    }
    return pages;
  }

  async function fetchContacts() {
    const response = await listContact(token, { name, email, phone, page });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setContacts(responseBody.data);
      setTotalPage(responseBody.paging.total_page);
    } else {
      await alertError(responseBody.errors);
      await navigate({
        pathname: "/login",
      });
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [reload]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition = "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>
      {/* Search form */}
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
          </div>
          <button type="button" id="toggleSearchForm" className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
            <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
          </button>
        </div>
        <div id="searchFormContent" className="mt-4">
          <form onSubmit={handleSearchForm}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="search_name" className="block text-gray-300 text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_name"
                    name="search_name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="search_email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_email"
                    name="search_email"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="search_phone" className="block text-gray-300 text-sm font-medium mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_phone"
                    name="search_phone"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
              >
                <i className="fas fa-search mr-2" /> Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Contact cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Contact Card */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="/dashboard/contacts/create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Create New Contact</h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>

        {contacts.map((contact) => (
          <ContactCard 
            key={contact.id}
            contact={contact} 
            onDelete={handleDeleteContact}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
          {page > 1 && (
            <a
              onClick={() => handlePage(page - 1)}
              href="#"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              <i className="fas fa-chevron-left mr-2" /> Previous
            </a>
          )}
          {getPages().map((value) => {
            if (value === page) {
              return (
                <a
                  onClick={() => handlePage(value)}
                  key={value}
                  href="#"
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
                >
                  {value}
                </a>
              );
            } else {
              return (
                <a
                  onClick={() => handlePage(value)}
                  key={value}
                  href="#"
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                >
                  {value}
                </a>
              );
            }
          })}
          {page < totalPage && (
            <a
              onClick={() => handlePage(page + 1)}
              href="#"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </a>
          )}
        </nav>
      </div>
    </>
  );
};
