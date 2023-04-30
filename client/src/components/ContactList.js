import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/contactList.css";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/contacts/${id}`)
      .then((res) => {
        console.log(res);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>      <h1>Contact List</h1>
    <div className="contacts">
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-card">
            <p className="contact-name">Name: <br/>{contact.name}</p>
            <p className="contact-email">Email: <br/>{contact.email}</p>
            <p className="contact-message">Message: <br/>{contact.message}</p>
            <div className="contact-buttons">
              <button
                className="delete-button"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ContactList;
