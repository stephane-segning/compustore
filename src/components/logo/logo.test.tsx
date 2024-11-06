import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
    it('renders a logo', () => {
        render(<Logo />);

        const logo = screen.getByRole<HTMLImageElement>('img');

        expect(logo).toBeInTheDocument();
    });
});