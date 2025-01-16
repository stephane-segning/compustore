'use client';

import React, { useState } from 'react';
import Button from '@cps/components/button';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-primary-content p-4 flex items-center justify-between relative">

     {/* Links for large screens */}
      <div className="hidden md:flex items-center gap-4">
        <a href="#" className="text-sm hover:underline">
          Home
        </a>
        <a href="#" className="text-sm hover:underline">
          Store
        </a>
      </div> 

      {/* Logo */}
      <h1 className="text-lg font-bold">GPS Demo</h1>

      {/* Actions (buttons) */}
      <div className="hidden md:flex gap-2">
        <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
          T
        </Button>
        <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
          C
        </Button>
        <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
          A
        </Button>
        <Link href="/auth/signin">
          <Button className="px-4 py-2 bg-neutral-light text-dark rounded-md">
            Sign In/ Sign Up
          </Button>
        </Link>
      </div>

      {/* Hamburger menu for small screens */}
      <Button
        className="md:hidden flex items-center text-neutral-content focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </Button>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral shadow-md md:hidden z-10">
          <div className="flex flex-col items-center gap-4 p-4">
            <a href="#" className="text-sm hover:underline">
              Home
            </a>
            <a href="#" className="text-sm hover:underline">
              Store
            </a>
            <div className="flex gap-2">
              <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
                T
              </Button>
              <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
                C
              </Button>
              <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">
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
