import { validateProductData } from '../validate';

test('validateProductData fails for missing fields', () => {
  const product = {}; // Missing all required fields (including description)
  const validationResult = validateProductData(product);

  expect(validationResult.success).toBe(false);
  expect(validationResult.error?.issues).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ path: ['id'], message: 'ID is required' }),
      expect.objectContaining({ path: ['name'], message: 'Name is required' }),
      expect.objectContaining({ path: ['prices'], message: 'Prices are required' }),
      expect.objectContaining({ path: ['images'], message: 'Images are required' }),
      expect.objectContaining({ path: ['description'], message: 'Description is required' }), 
    ])
  );
});

test('validateProductData passes for valid data', () => {
  const product = {
    id: '1',
    name: 'Sample Product',
    description: 'This is a product', // Non-empty description
    prices: [10.99, 12.99],
    images: ['/image1.png', '/image2.png'],
  };

  const validationResult = validateProductData(product);

  expect(validationResult.success).toBe(true);
});
