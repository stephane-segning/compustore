import React from 'react';
import Product, { ProductProps } from './product';

interface ProductListProps {
  products: ProductProps[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
  );

export default ProductList;
export type { ProductListProps };