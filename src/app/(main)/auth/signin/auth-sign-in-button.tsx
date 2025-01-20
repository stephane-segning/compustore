import React from 'react';
import Button from '@cps/components/button';

interface SocialSignInButtonsProps {
  handleSignIn: (provider: string) => void;
}

const SocialSignInButtons: React.FC<SocialSignInButtonsProps> = ({
  handleSignIn,
}) => (
  <div className="space-y-4 px-4 py-2 rounded-lg hover:scale-100">
    <Button
      onClick={() => handleSignIn('google')}
      className="flex gap-2 border py-2 mb-4 bg-transparent hover:scale-100 hover:bg-neutral-light w-full"
    >
      <span className="flex-1 text-left">Continue with Google</span>
    </Button>

    <Button
      onClick={() => handleSignIn('github')}
      className="flex gap-2 border bg-transparent w-full hover:scale-100 hover:bg-neutral-light"
    >
      <span className="flex-1 text-left">Continue with Github</span>
    </Button>

    <Button
      onClick={() => handleSignIn('discord')}
      className="flex gap-2 border bg-transparent w-full hover:scale-100 hover:bg-neutral-light"
    >
      <span className="flex-1 text-left">Continue with Discord</span>
    </Button>
    <Button
      onClick={() => handleSignIn('facebook')}
      className="flex gap-2 border bg-transparent w-full hover:scale-100 hover:bg-neutral-light"
    >
      <span className="flex-1 text-left">Continue with Facebook</span>
    </Button>
  </div>
);

export default SocialSignInButtons;
