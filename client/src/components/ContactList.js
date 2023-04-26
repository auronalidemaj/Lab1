import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

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
            <div>
            <h1>Contact List</h1>
            <ul>
            {contacts.map((contact) => (
        <li key={contact.id}>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Message: {contact.message}</p>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
            <button>
            <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
            </button>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
