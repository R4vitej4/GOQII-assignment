import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import DisplayUser from './components/displayUsers';


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dob: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/all');
      setUsers(response.data.response);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/create', formData);
      fetchUsers(); 
      setFormData({ name: '', email: '', password: '', dob: '' }); 
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">User Management</h2>
      <UserForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <h3 className="text-2xl font-semibold mt-8 mb-4">Users List</h3>
      <DisplayUser users={users} handleDelete={handleDelete} />
    </div>
  );
}

export default UserManagement;
