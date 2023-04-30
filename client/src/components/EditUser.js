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
    const userData = {
      username: username,
      email: email,
      role: role,
    }

    try {
      await axios.put(`http://localhost:3001/users/${id}`, userData);
      setSuccessMsg("User updated successfully");
      setErrorMsg("");
      navigate('/dashboard');
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg(err.response.data);
    }
  };

  return (
<div className="my-registration create-news-container">
  <div className="registration">
    <h1>Edit User</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        defaultValue={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button type="submit">Update User</button>
    </form>
    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
  </div>
</div>

  );
}

export default EditUser;
