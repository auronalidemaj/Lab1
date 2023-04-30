import React, { useState } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'
import './style/createUser.css';

function CreateUser() {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();


  const handleRegister = () => {
    if (!validateUsername(usernameReg)) {
      alert("Please enter a valid username");
      return;
    }

    if (!validateEmail(emailReg)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePassword(passwordReg)) {
      alert("Please enter a valid password");
      return;
    }

    if (!userRole) {
      alert("Please select a role");
      return;
    }

    Axios.post("http://localhost:3001/createUserDash", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
      role: userRole,
    }).then((response) => {
      console.log(response);
      navigate('/dashboard');

    });
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  return (
    <div className="my-registration">
      <div className="registration">
        <h1>Create User</h1>
  
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsernameReg(e.target.value)}
          value={usernameReg}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmailReg(e.target.value)}
          value={emailReg}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPasswordReg(e.target.value)}
          value={passwordReg}
        />
        <label>
          <select onChange={(e) => setUserRole(e.target.value)}>
            <option value="">select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button onClick={handleRegister}>Create User</button>
      </div>
    </div>  
  );
}

export default CreateUser;
