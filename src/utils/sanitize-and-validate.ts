import { sanitizeProductData } from './sanitize';
import { validateProductData } from './validate';

export const sanitizeAndValidateProductData = (product: {
  id: string;
  name: string;
  description: string;
  prices: number[];
  images: string[];
}) => {
  // Sanitize the product data
  const sanitizedProduct = sanitizeProductData({
    name: product.name,
    description: product.description,
  });

  // Combine sanitized fields with the rest of the product data
  const completeSanitizedProduct = {
    ...product,
    ...sanitizedProduct, // Use sanitized name and description
  };

  // Validate the sanitized product data
  const validation = validateProductData(completeSanitizedProduct);

  // Return sanitized and validated data or null if validation fails
  if (!validation.success) {
    console.error('Validation Error:', validation.error.errors); // Log validation errors for debugging
    return null;
  }

  return validation.data;
};
