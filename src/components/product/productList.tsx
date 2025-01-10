import React from 'react';
import Product, { ProductProps } from './product';

interface ProductListProps {
  products: ProductProps[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
    {products.map((product, index) => (
      <Product key={index} {...product} />
    ))}
  </div>
);

export default ProductList;
export type { ProductListProps };
