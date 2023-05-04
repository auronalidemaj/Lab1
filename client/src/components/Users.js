import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/users.css";

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
        <Link to="/CreateUser">
          <button className="create">Create User</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/EditUser/${user.id}`}>
                  <button className="edit">Edit</button>
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
