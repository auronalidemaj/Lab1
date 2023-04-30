import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NavLink, Link } from 'react-router-dom';
import '../components/style/signup.css';

function Signup() {
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [repeatPasswordReg, setRepeatPasswordReg] = useState("");
    const [error, setError] = useState("");
    
  
    const validateEmail = (email) => {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validateUsername = (username) => {
      // Username validation regex
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      return usernameRegex.test(username);
    };
  
    const validatePassword = (password) => {
      // Password validation regex
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return passwordRegex.test(password);
    };
  
    const handleRegister = () => {
      // Validation checks
      if (!emailReg || !usernameReg || !passwordReg) {
          setError("All fields are required");
          return;
      }
      if (!validateEmail(emailReg)) {
        setError("Invalid email address");
        return;
      }
      if (!validateUsername(usernameReg)) {
        setError(
          "Username should contain only letters and numbers, without spaces"
        );
        return;
      }
      if (!validatePassword(passwordReg)) {
        setError(
          "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
        );
        return;
      }
      if (passwordReg !== repeatPasswordReg) {
        setError("Passwords do not match");
        return;
      }
  
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response);
        setUsernameReg("");
        setEmailReg("");
        setPasswordReg("");
        setRepeatPasswordReg("");
        setError("");
        alert("User created successfully.")
      });
    };
  
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleRegister();
      }
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
            onKeyPress={handleKeyPress}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmailReg(e.target.value)}
            value={emailReg}
            onKeyPress={handleKeyPress}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordReg(e.target.value)}
            value={passwordReg}
            onKeyPress={handleKeyPress}
          />
          <input
            type="password"
            placeholder="repeat password"
            onChange={(e) => setRepeatPasswordReg(e.target.value)}
            value={repeatPasswordReg}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleRegister}>Register</button>
          <p><NavLink to="/login">Already have an account? Login</NavLink></p>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }
  
  export default Signup;
  