import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='title has-text-centered'>Users</h1>
      <h2 className='subtitle has-text-centered'>Add New User</h2>
      <div className="box">
        <form onSubmit={saveUser}>
          {msg && (
            <div className="notification is-danger is-light">
              <button className="delete" onClick={() => setMsg("")}></button>
              {msg}
            </div>
          )}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input is-rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input is-rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input is-rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="password"
                className="input is-rounded"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="****"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select is-fullwidth is-rounded">
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success is-fullwidth is-rounded">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddUser;
