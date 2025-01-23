import React from 'react';
import FormInput from '@cps/components/common/form-input';

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
  <FormInput
    label="Email address"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    error={error}
    required
    buttonLabel="Continue"
    onButtonClick={handleEmailSignIn}
  />
);

export default EmailInput;
