import React, { useState, useEffect } from "react";
import axios from 'axios';
import './style/subscribers.css'; // Import the CSS file

const Subscribers = () => {
  const [confirmedEmails, setConfirmedEmails] = useState([]);

  useEffect(() => {
    fetchConfirmedEmails();
  }, []);

  const fetchConfirmedEmails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/subscribers/confirmed");
      const emails = response.data;
      setConfirmedEmails(emails);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="subscribers-container">
        <div className="headers">
        <h1>Confirmed Emails</h1>
        </div>
      
      <ul className="subscribers-email-list">
        {confirmedEmails.map((email, index) => (
          <li key={index} className="subscribers-email-item">{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Subscribers;
