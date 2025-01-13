import { render, screen } from '@testing-library/react';
import ProductDetails from './product-details';

const mockProduct = {
  name: 'Amazing Camera',
  description: 'This is a top-quality camera for professional photographers.',
  images: [
    { url: '/images/camera1.jpg', title: 'Front View' },
    { url: '/images/camera2.jpg', title: 'Side View' },
  ],
  prices: [{ price: 999.99, currency: 'USD' }],
};

describe('ProductDetails', () => {
  it('renders product name', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByText('Amazing Camera')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(
      screen.getByText(
        'This is a top-quality camera for professional photographers.',
      ),
    ).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(screen.getByText('$999.99 USD')).toBeInTheDocument();
  });

  it('renders an add-to-cart button', () => {
    render(<ProductDetails product={mockProduct} />);
    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });
});
