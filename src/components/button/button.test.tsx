import { render, screen } from '@testing-library/react'
import Button from './button';
 
describe('Page', () => {
    it('renders a rounded button', () => {
        render(<Button color='primary' shape='rounded'>Some text</Button>)
 
        const button = screen.getByText<HTMLButtonElement>('Some text')
 
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('rounded-lg')
        expect(button).toHaveClass('bg-primary-light')
        expect(button).not.toHaveClass('rounded-full')
        expect(button).not.toHaveClass('rounded-[0.1rem]')
    });

    it('renders a square button', () => {
        render(<Button color='primary' shape="square">Some text</Button>)
 
        const button = screen.getByText<HTMLButtonElement>('Some text')
 
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('rounded-[0.1rem]')
        expect(button).toHaveClass('bg-primary-light')
        expect(button).not.toHaveClass('rounded-lg')
        expect(button).not.toHaveClass('rounded-full')
    });

    it('renders a circle button', () => {
        render(<Button color='primary' shape="circle">Some text</Button>)
 
        const button = screen.getByText<HTMLButtonElement>('Some text')
 
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('rounded-full');
        expect(button).toHaveClass('bg-primary-light')
        expect(button).not.toHaveClass('rounded-lg')
        expect(button).not.toHaveClass('rounded-[0.1rem]')
    });

    it('renders a primary button', () => {
        render(<Button color="secondary">Some text</Button>)
 
        const button = screen.getByText<HTMLButtonElement>('Some text')
 
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('bg-secondary-light')
        expect(button).toHaveClass('text-secondary-content')
        expect(button).not.toHaveClass('bg-primary')
        expect(button).not.toHaveClass('text-primary-content')
    });

    it('renders a secondary button', () => {
        render(<Button color="none">Some text</Button>)
 
        const button = screen.getByText<HTMLButtonElement>('Some text')
 
        expect(button).toBeInTheDocument()
        expect(button).not.toHaveClass('bg-primary-light')
        expect(button).not.toHaveClass('text-primary-content')
        expect(button).not.toHaveClass('bg-secondary')
        expect(button).not.toHaveClass('text-secondary-content')
    });
})