import React from 'react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className='flex h-screen items-center justify-center'>
    <p className='text-xl text-danger-light'>{message}</p>
  </div>
);

export default ErrorState;
