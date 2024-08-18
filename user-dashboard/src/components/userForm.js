import React, { useState }  from 'react';
import Input from './input';
import Button from './Button';

const UserForm = ({ formData, handleInputChange, handleSubmit, isEditing }) => {
    const [error, setError] = useState('');

    const validateDateOfBirth = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
        return selectedDate <= today;
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dob') {
        if (!validateDateOfBirth(value)) {
            setError('Date of birth cannot be in the future');
        } else {
            setError('');
        }
        }
        handleInputChange(e);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your Name"
                required
            />
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email address"
                required
            />
            <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
            />
            <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleDateChange}
                placeholder="Date of Birth"
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                {isEditing ? 'Update User' : 'Create User'}
            </Button>
            
        </form>
    );
};

export default UserForm;
