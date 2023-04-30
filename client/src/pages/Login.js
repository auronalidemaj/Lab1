import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NavLink, Link } from 'react-router-dom';
import '../components/style/signup.css';


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        setUsername("");
        setPassword("");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="my-registration">
      <div className="registration">
        <h1>Login</h1>
        <input type="text" placeholder="username" onChange={handleUsernameChange} onKeyPress={handleKeyPress} value={username}/>
        <input type="password" placeholder="password" onChange={handlePasswordChange} onKeyPress={handleKeyPress} value={password}/>
        <button onClick={login}>Login</button>
        <p><NavLink to="/signup">Don't have an account? Signup now!</NavLink></p>
        <div className="login-message">{loginStatus}</div>
      </div>
    </div>
  )
}


export default Login