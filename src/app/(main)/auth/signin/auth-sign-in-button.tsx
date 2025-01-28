import React from 'react';
import Image from 'next/image';
import Button from '@cps/components/button';

interface SocialSignInButtonsProps {
  handleSignIn: (provider: string) => void;
}

const SocialSignInButtons: React.FC<SocialSignInButtonsProps> = ({
  handleSignIn,
}) => {
  const providers = [
    { name: 'google', icon: '/icons/icons8-google-48.png' },
    { name: 'github', icon: '/icons/icons8-github-64.png' },
    { name: 'discord', icon: '/icons/icons8-discord-48.png' },
    { name: 'facebook', icon: '/icons/icons8-facebook-48.png' },
  ];

  return (
    <div className="space-y-4 px-4 py-2 rounded-lg">
      {providers.map(({ name, icon }) => (
        <Button
          key={name}
          onClick={() => handleSignIn(name)}
          variant="outlined"
          size="lg"
          className='flex '
        >
          <div className="flex items-center space-x-2">
            <Image
              src={icon}
              alt={`${name} Icon`}
              width={34}
              height={34} 
            />
            <span>Continue with {name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialSignInButtons;
