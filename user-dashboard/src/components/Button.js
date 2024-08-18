import React from 'react';

const Button = ({ type, onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 rounded-lg text-white focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
