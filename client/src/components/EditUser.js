import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import './style/createUser.css'

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        const userData = res.data[0];
        setUsername(userData.username);
        setEmail(userData.email);
        setRole(userData.role);
      })
      .catch((err) => setErrorMsg(err.response.data));
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateUsername(username)) {
      setErrorMsg("Please enter a valid username");
      return;
    }
  
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
  
    if (!role) {
      setErrorMsg("Please select a role");
      return;
    }
  
    const userData = {
      username: username,
      email: email,
      role: role,
    };
  
    try {
      await axios.put(`http://localhost:3001/users/${id}`, userData);
      setSuccessMsg("User updated successfully");
      setErrorMsg("");
      navigate("/dashboard");
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg(err.response.data);
    }
  };
  

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
<div className="my-registration">
  <div className="registration">
    <h1>Edit User</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <br />
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        defaultValue={role}
        onChange={(e) => setRole(e.target.value)}
        className="input-field"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button type="submit" className="submit-button">Update User</button>
    </form>
    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
  </div>
</div>

  );
}

export default EditUser;
