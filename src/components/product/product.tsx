import React from 'react';
import DOMPurify from 'dompurify';
import Button from '../button';

interface ProductProps {
  title: string;
  description?: string;
  price: string;
  imageUrl: string;
  onAddToCart?: () => void;
}

const Product: React.FC<ProductProps> = ({ title, description, price, imageUrl, onAddToCart}) => {
  const sanitizedDescription = description
    ? DOMPurify.sanitize(description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'p', 'span'],
        ALLOWED_ATTR: ['class', 'style'],
      })
    : '';

  return (
    <div data-testid="product-container" className="p-4 border rounded-lg shadow transition transform">
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-md" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <div
        className="text-md whitespace-nowrap overflow-hidden text-ellipsis"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <p className="text-neutral-600">{price}</p>
      {onAddToCart && (
        <Button
          color='secondary'
          className="mt-2 py-3 flex justify-center items-center"
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      )}
      
    </div>
  );
};

export default Product;
export type { ProductProps };
