import React, { useState, useEffect } from "react";
import axios from "axios";
import './style/users.css'

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="users">
      <h1>User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <p className="user-name">Username: <br></br>{user.username}</p>
            <p className="user-email"> Email: <br></br>{user.email}</p>
            <div className="button-group">
              <button>Edit</button>
              <button>Delete</button>
              <button>Role</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
