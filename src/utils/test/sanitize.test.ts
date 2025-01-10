import { sanitizeProductData } from '../sanitize';

test('sanitizeProductData removes harmful scripts and keeps allowed content', () => {
  const product = {
    name: '<script>alert("XSS")</script>cool product',
    description: '<b>This is a product!</b><script>alert("hack")</script>',
  };

  const sanitizedProduct = sanitizeProductData(product);

  // Expect the name to have no script tags or their content
  expect(sanitizedProduct.name).toBe('cool product');

  // Expect the description to retain allowed tags but remove <script>
  expect(sanitizedProduct.description).toBe('<b>This is a product!</b>');
});
