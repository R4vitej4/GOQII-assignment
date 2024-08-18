import React from 'react';

const DisplayUser = ({ users, handleEdit, handleDelete }) => {
    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-2 border-b">
                    <span>{user.name} ({user.email})</span>
                    <div>
                        <button 
                            onClick={() => handleEdit(user)} 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(user.id)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayUser;
