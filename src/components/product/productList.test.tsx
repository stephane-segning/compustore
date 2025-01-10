import { render, screen } from '@testing-library/react';
import ProductList from './productList';

test('renders ProductList with multiple products', () => {
  const products = [
    {
      title: 'Product 1',
      description: 'This is Product 1',
      price: '$99.99',
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/os3e9z3T0gpfIFIGZGVoU-Vzh6Q=/0x213:2039x1360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52590407/jkastrenakes_161222_1339_A_0018__1_.0.0.jpeg',
    },
    {
      title: 'Product 2',
      description: 'This is Product 2',
      price: '$49.99',
      imageUrl:
        'https://th.bing.com/th/id/R.f42d7157dafd7c67fdf283aafded8700?rik=cOe%2bU3oNGRqPow&pid=ImgRaw&r=0',
    },
  ];
  render(<ProductList products={products} />);

  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
});
