'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import EmailInput from './email-input';
import SocialSignInButtons from './auth-sign-in-button';
import Button from '@cps/components/button';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailSignIn = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setError('');
      await signIn('email', {
        email,
        redirect: true,
        callbackUrl: '/Home',
      });
    } catch (error) {
      setError('Failed to sign in, please try again.');
    }
  };

  const handleSignIn = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="p-8 rounded-lg max-w-sm">
      <h1 className="text-xl font-semibold text-center mb-4">Welcome back</h1>

      {/* Email Input */}
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={error}
        handleEmailSignIn={handleEmailSignIn}
      />

      {/* Sign Up Link */}
      <p className="text-sm text-center mb-6">
        Don't have an account?
        <Button 
          as="a"
          href="/auth/signup"
          variant="outlined"
          size="lg"
        >
          Sign up
        </Button>
      </p>

      {/* Divider */}
      <div className="flex items-center mb-6">
        <div className="flex-1 h-px bg-neutral"></div>
        <span className="px-3 text-sm ">OR</span>
        <div className="flex-1 h-px bg-neutral"></div>
      </div>

      {/* Social Sign-In */}
      <SocialSignInButtons handleSignIn={handleSignIn} />
    </div>
  );
};


// page.tsx
export default SignInPage;
