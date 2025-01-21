import React from 'react';
import Button from '@cps/components/button';

interface SocialSignInButtonsProps {
  handleSignIn: (provider: string) => void;
}

const SocialSignInButtons: React.FC<SocialSignInButtonsProps> = ({
  handleSignIn,
}) => (
  <div className="space-y-4 px-4 py-2 rounded-lg">
    <Button
      onClick={() => handleSignIn('google')}
      className="gap-2 border bg-transparent  hover:bg-neutral-light w-full"
    >
      <span>Continue with Google</span>
    </Button>

    <Button
      onClick={() => handleSignIn('github')}
      className="gap-2 border bg-transparent w-full  hover:bg-neutral-light"
    >
      <span>Continue with Github</span>
    </Button>

    <Button
      onClick={() => handleSignIn('discord')}
      className="gap-2 border bg-transparent w-full hover:bg-neutral-light"
    >
      <span>Continue with Discord</span>
    </Button>
    <Button
      onClick={() => handleSignIn('facebook')}
      className="gap-2 border bg-transparent w-full hover:bg-neutral-light"
    >
      <span>Continue with Facebook</span>
    </Button>
  </div>
);

export default SocialSignInButtons;
