import { sanitizeAndValidateProductData } from '../sanitize-and-validate';
import { sanitizeProductData } from '../sanitize';

// testing functions for product data sanitization and validation 
test('sanitizeAndValidateProductData works correctly', () => {
  const product = {
    id: '123',
    name: '<script>alert("XSS")</script>Cool Product',
    description: '<b>This is a great product!</b>',
    prices: [19.99, 29.99],
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  };

  const sanitize = sanitizeProductData(product)
  const result = sanitizeAndValidateProductData(product);

  expect(result).not.toBeNull(); // Should pass sanitization and validation
  expect(result?.name).toBe('Cool Product'); // Script tags removed
  expect(sanitize?.description).toBe('<b>This is a great product!</b>'); // Description with <b> tag retained
  expect(result?.prices).toEqual([19.99, 29.99]); // Prices unchanged
  expect(result?.images).toEqual([
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ]); // Images unchanged
});
