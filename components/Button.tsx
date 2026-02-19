
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...props }) => {
  return (
    <button
      className={`
        px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
        bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg
        focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''}
        ${className || ''}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
    