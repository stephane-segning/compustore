import React from 'react';
import Button from '@cps/components/button';

interface SocialSignInButtonsProps {
  handleSignIn: (provider: string) => void;
}

const SocialSignInButtons: React.FC<SocialSignInButtonsProps> = ({
  handleSignIn,
}) => {
  const providers = ['google', 'github', 'discord', 'facebook'];

  return (
    <div className="space-y-4 px-4 py-2 rounded-lg">
      {providers.map((provider) => (
        <Button
          key={provider}
          onClick={() => handleSignIn(provider)}
          variant='outlined'
          size="lg"
        >
          <span>Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialSignInButtons;
