import DOMPurify from 'dompurify';
import React from 'react';
import Button from '../button';

interface ProductProps {
  title: string;
  description?: string;
  price: string;
  imageUrl: string;
  onAddToCart?: () => void;
}

const Product: React.FC<ProductProps> = ({
  title,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const sanitizedDescription = description
    ? DOMPurify.sanitize(description, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'p', 'span'],
        ALLOWED_ATTR: ['class', 'style'],
      })
    : '';

  return (
    <div
      data-testid='product-container'
      className='transform rounded-lg border p-4 shadow transition'>
      <img
        src={imageUrl}
        alt={title}
        className='h-auto w-full rounded-md object-cover'
      />
      <h3 className='text-lg font-semibold'>{title}</h3>
      <div
        className='text-md overflow-hidden text-ellipsis whitespace-nowrap'
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <p className='text-neutral-600'>{price}</p>
      {onAddToCart && (
        <Button
          color='secondary'
          className='mt-2 flex items-center justify-center py-3'
          onClick={onAddToCart}>
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default Product;
export type { ProductProps };
