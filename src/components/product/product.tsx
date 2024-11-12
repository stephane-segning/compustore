import React from 'react';

interface ProductProps {
    title: string;
    description?: string
    price: string;
    imageUrl: string;
}

const Product: React.FC<ProductProps> = ({ title, description, price, imageUrl }) => (
  <div data-testid="product-container" className="p-4 border rounded-lg shadow hover:scale-105 transition transform">
    <img src={imageUrl} alt={title}  className="w-full h-auto object-cover rounded-md" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <h3 className="text-md">{description}</h3>
    <p className="text-gray-600">{price}</p>
    
  </div>
);

export default Product;
export type { ProductProps };
