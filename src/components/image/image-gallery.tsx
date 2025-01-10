'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../button';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine the visible images
  const visibleImages = showAll ? images : images.slice(0, 6);

  return (
    <div className='relative'>
      {/* Image grid with no spacing */}
      <div className='grid w-full max-w-lg grid-cols-3 grid-rows-2'>
        {/* First (large) image */}
        {visibleImages.slice(0, 1).map((image, idx) => (
          <div key={idx} className='col-span-2 row-span-2'>
            <Image
              src={image.src}
              alt={image.alt}
              width={100}
              height={200}
              className='h-full w-full object-cover'
            />
          </div>
        ))}
        {/* Smaller images */}
        {visibleImages.slice(1).map((image, idx) => (
          <div
            key={idx}
            className={`relative col-span-1 row-span-1 ${
              idx === 5 && !showAll && images.length > 5 ? 'blur-sm' : ''
            }`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={80}
              height={80}
              className='h-full w-full object-cover'
            />
            {/* "Show More" button overlay */}
            {idx === 4 && !showAll && images.length > 5 && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Button
                  shape='rounded'
                  color='secondary'
                  size='md'
                  onClick={() => setShowAll(true)}>
                  See More
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* "Show Less" button */}
      {showAll && (
        <div>
          <Button
            shape='rounded'
            color='secondary'
            size='md'
            onClick={() => setShowAll(false)}>
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
