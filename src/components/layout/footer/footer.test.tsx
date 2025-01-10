import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders the footer title', () => {
    render(<Footer />);
    expect(screen.getByText('Compustore')).toBeInTheDocument();
  });

  it('contains links to Socials, Store, and Contact', () => {
    render(<Footer />);
    expect(screen.getByText('Socials')).toHaveAttribute('href', '#');
    expect(screen.getByText('Store')).toHaveAttribute('href', '#');
    expect(screen.getByText('Contact')).toHaveAttribute('href', '#');
  });
});
