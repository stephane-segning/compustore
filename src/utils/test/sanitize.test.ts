import { sanitizeProductData } from "../sanitize";

test('sanitizeProductData removes harmful scripts but keeps text', () => {
  const product = {
    name: '<script>alert("XSS")</script>cool product',
    description: '<b>This is a product!</b>',
  };

  const sanitizedProduct = sanitizeProductData(product);

  expect(sanitizedProduct.name).toBe('cool product'); // Script tag removed, content retained
  expect(sanitizedProduct.description).toBe('<b>This is a product!</b>'); // Description remains unchanged
});
