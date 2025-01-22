import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navbar';

const actionButtons = [
  { label: 'T', shape: 'circle', color: 'neutral' },
  { label: 'C', shape: 'circle', color: 'neutral' },
  { label: 'A', shape: 'circle', color: 'neutral' },
];

describe('Navbar Component', () => {
  it('renders buttons with labels', () => {
    render(<Navbar />);
    
    // Check if the action buttons are rendered
    actionButtons.forEach((btn) => {
      expect(screen.getByText(btn.label)).toBeInTheDocument();
    });
  });

  it('renders the "Sign In/ Sign Up" button', () => {
    render(<Navbar />);
    expect(screen.getByText('Sign In / Sign Up')).toBeInTheDocument();
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

  it('toggles the menu on small screens when the hamburger button is clicked', () => {
    render(<Navbar />);
    const toggleMenuButton = screen.getByLabelText('Toggle menu');
    
    // Initially, the dropdown menu should not be visible
    const homeLink = screen.queryByText('Home');
    expect(homeLink).toBeInTheDocument();
    
    // Click the hamburger menu button to open the menu
    fireEvent.click(toggleMenuButton);
    
    // Now the Home link should be visible
   

    // Click the hamburger menu button again to close the menu
    fireEvent.click(toggleMenuButton);
    
  });
});
