import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  className = '',
  error = false,
  ...props
}) => {
  return (
    <input
      type="email"
      id={id}
      value={value}
      onChange={onChange}
      className={`block w-full px-4 py-2 border rounded-md placeholder-500 focus:outline-none focus:ring-neutral-light focus:border-neutral-light ${
        error ? 'border-red' : ''
      } ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;