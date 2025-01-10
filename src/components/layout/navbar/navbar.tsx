'use client';

import Button from '@cps/components/button';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className='relative flex items-center justify-between bg-primary-content p-4'>
      {/* Links for large screens */}
      <div className='hidden items-center gap-4 md:flex'>
        <a href='#' className='text-sm hover:underline'>
          Home
        </a>
        <a href='#' className='text-sm hover:underline'>
          Store
        </a>
      </div>

      {/* Logo */}
      <h1 className='text-lg font-bold'>GPS Demo</h1>

      {/* Actions (buttons) */}
      <div className='hidden gap-2 md:flex'>
        <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
          T
        </Button>
        <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
          C
        </Button>
        <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
          A
        </Button>
      </div>

      {/* Hamburger menu for small screens */}
      <Button
        className='flex items-center text-neutral-content focus:outline-none md:hidden'
        onClick={toggleMenu}
        aria-label='Toggle menu'>
        <svg
          className='h-6 w-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </Button>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className='absolute left-0 top-full z-10 w-full bg-neutral shadow-md md:hidden'>
          <div className='flex flex-col items-center gap-4 p-4'>
            <a href='#' className='text-sm hover:underline'>
              Home
            </a>
            <a href='#' className='text-sm hover:underline'>
              Store
            </a>
            <div className='flex gap-2'>
              <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
                T
              </Button>
              <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
                C
              </Button>
              <Button className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-light'>
                A
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
