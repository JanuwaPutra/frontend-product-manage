import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users. Please try again later.");
        }
    };

    const deleteUsers = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        } catch (err) {
            setError("Failed to delete user. Please try again.");
        }
    };

    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>List Of Users</h2>
            <Link to="/users/add" className="button is-primary mb-2">Add New</Link>
            {error && <p className="has-text-danger">{error}</p>}
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.uuid}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={() => deleteUsers(user.uuid)} className='button is-small is-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="has-text-centered">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Userlist;
