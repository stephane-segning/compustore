import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar Component', () => {
  it('renders buttons with icons', () => {
    render(<Navbar />);
  });

  it('renders the "Sign In/ Sign Up" button', () => {
    render(<Navbar />);
    expect(screen.getByText('Sign In/ Sign Up')).toBeInTheDocument();
  });

  it('renders the hamburger menu button for small screens', () => {
    render(<Navbar />);
    const toggleMenuButton = screen.getByLabelText('Toggle menu');
    expect(toggleMenuButton).toBeInTheDocument();
  });

  it('displays the website title', () => {
    render(<Navbar />);
    expect(screen.getByText('GPS Demo')).toBeInTheDocument();
  });
});
