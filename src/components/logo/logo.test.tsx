import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
    it('renders a logo', () => {
        render(<Logo />);

        const logo = screen.getByRole<HTMLImageElement>('img');

        expect(logo).toBeInTheDocument();
    });

    it('renders a logo with a circular shape', () => {
        render(<Logo shape='circle' />);

        const logo = screen.getByRole<HTMLImageElement>('img');
        const wrapper = logo.parentElement;

        expect(logo).toBeInTheDocument();
        expect(wrapper).toHaveClass('rounded-full');
        expect(wrapper).not.toHaveClass('rounded-lg');
        expect(wrapper).not.toHaveClass('rounded-[0.1rem]');
    });

    it('renders a logo with a square shape', () => {
        render(<Logo shape='square' />);

        const logo = screen.getByRole<HTMLImageElement>('img');
        const wrapper = logo.parentElement;

        expect(logo).toBeInTheDocument();
        expect(wrapper).not.toHaveClass('rounded-full');
        expect(wrapper).not.toHaveClass('rounded-lg');
        expect(wrapper).toHaveClass('rounded-[0.1rem]');
    });

    it('renders a logo with a red color', () => {
        render(<Logo color='red' />);

        const logo = screen.getByRole<HTMLImageElement>('img');
        const wrapper = logo.parentElement;

        expect(logo).toBeInTheDocument();
        expect(wrapper).not.toHaveClass('bg-[blue]');
        expect(wrapper).toHaveClass('bg-[red]');
        expect(wrapper).not.toHaveClass('bg-[green]');
    });

    it('renders a logo with a green color', () => {
        render(<Logo color='green' />);

        const logo = screen.getByRole<HTMLImageElement>('img');
        const wrapper = logo.parentElement;

        expect(logo).toBeInTheDocument();
        expect(wrapper).not.toHaveClass('bg-[blue]');
        expect(wrapper).not.toHaveClass('bg-[red]');
        expect(wrapper).toHaveClass('bg-[green]');
    });
});