import React from 'react';
import Button from '@cps/components/button/button';
import ErrorState from '@cps/components/common/error-state';
import Input from '@cps/components/input/input';

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
      className="block text-sm font-medium text-neutral-content mb-1"
    >
      Email address<span className="text-red">*</span>
    </label>
    <Input
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      error={!!error}
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
      color='outlined'
      size='lg'
    >
      Continue
    </Button>
  </div>
);

export default EmailInput;
