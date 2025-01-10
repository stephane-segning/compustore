import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar Component', () => {
  it('renders the navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toHaveAttribute('href', '#');
    expect(screen.getByText('Store')).toHaveAttribute('href', '#');
  });

  it('renders buttons with icons', () => {
    render(<Navbar />);
    expect(screen.getAllByRole('button')).toHaveLength(4); // Three buttons
  });

  it('displays the website title', () => {
    render(<Navbar />);
    expect(screen.getByText('GPS Demo')).toBeInTheDocument();
  });
});
