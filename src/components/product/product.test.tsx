import { render, screen } from '@testing-library/react';
import Product from './product';

describe('Product Component', () => {
  const mockProps = {
    title: 'Test Product',
    description: 'This is a test product',
    price: '$9.99',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/os3e9z3T0gpfIFIGZGVoU-Vzh6Q=/0x213:2039x1360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52590407/jkastrenakes_161222_1339_A_0018__1_.0.0.jpeg',
  };

  test('renders Product with title, price, and image', () => {
    render(<Product {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();

    const imageElement = screen.getByRole('img', { name: mockProps.title });
    expect(imageElement).toHaveAttribute('src', mockProps.imageUrl);
    expect(imageElement).toHaveAttribute('alt', mockProps.title);

    const productContainer = screen.getByTestId('product-container');
    expect(productContainer).toHaveClass(
      'p-4',
      'rounded-lg',
      'border',
      'shadow',
      'transition',
      'transform',
    );
  });

  test('sanitizes potentially harmful input in description', () => {
    const dangerousDescription =
      '<script>alert("XSS")</script><b>Valid Bold</b>';
    render(<Product {...mockProps} description={dangerousDescription} />);

    // The bold text should render, but the script tag should not
    expect(screen.getByText('Valid Bold')).toBeInTheDocument();
    expect(screen.queryByText('alert("XSS")')).not.toBeInTheDocument();
  });

  test('handles missing description gracefully', () => {
    const { container } = render(
      <Product {...mockProps} description={undefined} />,
    );

    // Ensure no content is rendered for the description
    const descriptionContainer = container.querySelector('.text-md');
    expect(descriptionContainer).toBeEmptyDOMElement();
  });

  test('renders sanitized HTML content in description', () => {
    const htmlDescription = 'This is <i>italicized</i> and <b>bold</b>';
    render(<Product {...mockProps} description={htmlDescription} />);

    // The italicized and bold text should render correctly
    const italicText = screen.getByText('italicized');
    const boldText = screen.getByText('bold');

    expect(italicText.tagName).toBe('I');
    expect(boldText.tagName).toBe('B');
  });

  test('blocks unauthorized tags and attributes in description', () => {
    const dangerousDescription =
      '<script>alert("XSS")</script><span style="color:red;">Valid Text</span>';
    render(<Product {...mockProps} description={dangerousDescription} />);

    // Valid tags should render
    const spanElement = screen.getByText('Valid Text');
    expect(spanElement).toBeInTheDocument();

    // The script tag should not render
    expect(screen.queryByText('alert("XSS")')).not.toBeInTheDocument();

    // Validate allowed attributes
    expect(spanElement).toHaveAttribute('style', 'color:red;');
  });
});
