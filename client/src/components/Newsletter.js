import React, { useState } from "react";
import axios from 'axios';
import '../components/style/newsletter.css';

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/subscribe", {
        name: name,
        email: email,
      });

      const { message } = response.data;
      if (message) {
        setAlertMessage(message);
        setShowVerificationMessage(false);
      } else {
        setAlertMessage("");
        setShowVerificationMessage(true);
        setName("");
        setEmail("");
      }
    } catch (err) {
      console.log(err);
      setAlertMessage("An error occurred. Please try again later.");
      setShowVerificationMessage(false);
    }
  };

  return (
    <div className="newsletter-form">
      <h2>Subscribe to our Newsletter</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      {showVerificationMessage && (
        <div className="verification-message">
          Thank you for subscribing! Please check your email to verify your subscription.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="submit" value="Subscribe" />
      </form>
    </div>
  );
};

export default Newsletter;
