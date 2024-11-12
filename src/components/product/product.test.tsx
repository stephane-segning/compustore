import { render, screen } from '@testing-library/react';
import Product from './product';

describe('Product Component', () => {
  const mockProps = {
    title: 'Test Product',
    description: 'This is a test product',
    price: '$9.99',
    imageUrl: 'https://cdn.vox-cdn.com/thumbor/os3e9z3T0gpfIFIGZGVoU-Vzh6Q=/0x213:2039x1360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52590407/jkastrenakes_161222_1339_A_0018__1_.0.0.jpeg',
  };

  test('renders Product with title, price, and image', () => {
    render(<Product {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
  
    const imageElement = screen.getByRole('img', { name: mockProps.title });
    expect(imageElement).toHaveAttribute('src', mockProps.imageUrl);
    expect(imageElement).toHaveAttribute('alt', mockProps.title);
  
    const productContainer = screen.getByTestId('product-container');
    expect(productContainer).toHaveClass('p-4', 'rounded-lg', 'border', 'shadow', 'hover:scale-105', 'transition' ,'transform'); // Adjust based on your actual component's classes
  });
  
});