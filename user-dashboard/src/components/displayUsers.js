import React from 'react';

const displayUsers = ({ users, handleDelete }) => {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm"
        >
          <span className="font-medium">{user.name}</span> - {user.email}
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default displayUsers;
