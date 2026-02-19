
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({ id, value, onChange, placeholder, rows = 5, className, ...props }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full p-3 border border-gray-300 rounded-md
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all duration-200 ease-in-out
        text-gray-800 bg-gray-50 resize-y
        ${className || ''}
      `}
      {...props}
    />
  );
};
    