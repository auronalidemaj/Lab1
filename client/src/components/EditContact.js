import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './style/contact.css';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/contacts`)
      .then((res) => setContact(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    axios
      .put(`http://localhost:3001/contacts/${id}`, updatedContact)
      .then((res) => {
        console.log(res);
        navigate('/contactList');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mp-contact-container">
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" defaultValue={contact.name} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" defaultValue={contact.email} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" defaultValue={contact.message} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditContact;

