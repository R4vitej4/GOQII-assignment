import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import DisplayUser from './components/displayUsers';


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dob: '' });
  const [editingUserId, setEditingUserId] = useState(null); 

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
      if (editingUserId) {
        // Update the user
        try {
          await axios.put(`/api/user/${editingUserId}`, formData);
          fetchUsers(); 
          setFormData({ name: '', email: '', password: '', dob: '' });
          setEditingUserId(null);
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
      else{
        try{
          await axios.post('/api/user/create', formData);
          fetchUsers(); 
          setFormData({ name: '', email: '', password: '', dob: '' }); 
        }
        catch (error) {
          console.error('Error updating user:', error);
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: user.password, dob: formatDate(user.dob) }); 
    setEditingUserId(user.id); 
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
        isEditing={!!editingUserId} // Pass editing state to UserForm to change button text
      />
      <h3 className="text-2xl font-semibold mt-8 mb-4">Users List</h3>
      <DisplayUser 
        users={users} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
      />
    </div>
  );
}

export default UserManagement;
