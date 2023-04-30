import React, { useState } from "react";
import Axios from "axios";
import './style/createUser.css';

function CreateUser() {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleRegister = () => {
    Axios.post("http://localhost:3001/createUserDash", {
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
      role: userRole,
    }).then((response) => {
      console.log(response);
      alert("User added successfully!");
    });
  };

  return (
    <div className="my-registration">
      <div className="registration">
        <h1>Registration</h1>
  
       
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
