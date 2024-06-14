import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createUser(newUser);
      fetchUsers();
    } catch (error) {
      setError('Failed to create user');
    }
  };

  const handleUpdate = async (id) => {
    const username = prompt('Enter new username:', '');
    const email = prompt('Enter new email:', '');
    const password = prompt('Enter new password:', '');
    if (username && email && password) {
      try {
        await updateUser(id, { username, email, password });
        fetchUsers();
      } catch (error) {
        setError('Failed to update user');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container">
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>Username: {user.username}, Email: {user.email}</span>
            <span>
              <button onClick={() => handleUpdate(user.id)}>Update</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default UserList;