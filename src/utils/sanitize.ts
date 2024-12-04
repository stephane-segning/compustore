import DOMPurify from 'dompurify';

export const sanitizeProductData = (product: { name: string; description: string }) => {

  const removeScriptTags = (input: string): string => {
    // Replace <script> tags with their inner content
    return input.replace(/<script.*?>(.*?)<\/script>/gi, '$1');
  };
  return {
    // Sanitize the name (remove all tags)
    name: DOMPurify.sanitize(product.name, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),

    // Sanitize the description (allow basic formatting tags)
    description: DOMPurify.sanitize(removeScriptTags(product.description), {
      ALLOWED_TAGS: ['b', 'i', 'u'], // Allow only these tags
      ALLOWED_ATTR: [], // No attributes allowed
    }),
  };
};

