import Image from 'next/image';
import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

const LoneImage: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={70}
      height={300}
      className='h-auto w-64 object-contain'
    />
  );
};

export default LoneImage;
