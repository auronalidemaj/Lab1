import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './style/users.css'
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then((res) => {
        console.log(res);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="users">

      <div className="headers">
        <h1>User List</h1>      
        <Link to="/CreateUser"><button className="a">Create User</button></Link>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <p className="user-name">Username: <br></br>{user.username}</p>
            <p className="user-email"> Email: <br></br>{user.email}</p>
            <p className="user-role"> Role: <br></br>{user.role}</p>
            <div className="button-group">
              <Link to={`/EditUser/${user.id}`}><button className="edit">Edit</button></Link>
              <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
