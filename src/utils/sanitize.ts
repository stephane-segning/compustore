import DOMPurify from 'dompurify';

export const sanitizeProductData = (product: {
  name: string;
  description: string;
}) => {
  return {
    // Sanitize the name (remove all tags)
    name: DOMPurify.sanitize(product.name, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }),

    // Sanitize the description (allow basic formatting tags)
    description: DOMPurify.sanitize(product.description, {
      ALLOWED_TAGS: ['b', 'i', 'u'], // Allow only these tags
      ALLOWED_ATTR: [], // No attributes allowed
    }),
  };
};
