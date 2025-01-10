import { render, screen } from '@testing-library/react';
import LoadingState from './loading-state';

describe('LoadingState', () => {
  it('renders a loading indicator', () => {
    render(<LoadingState />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
