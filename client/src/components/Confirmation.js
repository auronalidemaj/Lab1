import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const { confirmationToken } = useParams();
  const [confirmationStatus, setConfirmationStatus] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/confirm/${confirmationToken}`
        );
        const { message } = response.data;
        setConfirmationStatus(message);
      } catch (err) {
        console.log(err);
        setConfirmationStatus('An error occurred. Please try again later.');
      }
    };

    confirmSubscription();
  }, [confirmationToken]);

  return (
    <div>
      <h2>Email Confirmation</h2>
      <p>{confirmationStatus}</p>
    </div>
  );
};

export default Confirmation;
