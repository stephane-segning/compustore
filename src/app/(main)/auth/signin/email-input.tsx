'use client';

import React from 'react';
import Button from '@cps/components/button';
import ErrorState from '@cps/components/common/error-state';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  handleEmailSignIn: () => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  error,
  handleEmailSignIn,
}) => (
  <div className="mb-6">
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Email address<span className="text-red">*</span>
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full px-4 py-2 border rounded-md placeholder-500 focus:outline-none focus:ring-neutral-light focus:border-neutral-light"
      placeholder="Enter your email"
    />

    {error && (
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <ErrorState message={error} />
        </div>
      </div>
    )}
    
    <Button
      onClick={handleEmailSignIn}
      className="w-full border text-dark py-2 mt-4 hover:scale-100 bg-transparent hover:bg-primary-light"
    >
      Continue
    </Button>
  </div>
);

export default EmailInput;
