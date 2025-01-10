'use client';

import ProductList from '@cps/components/product/productList';
import { useAllProducts } from '@cps/trpc/hooks/use-product';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import React from 'react';

const ProductsDisplay: React.FC = () => {
  const { data: rawProducts, isLoading, error, isError } = useAllProducts();

  if (isLoading) {
    return <div className='py-10 text-center'>Loading products...</div>;
  }

  if (isError) {
    return (
      <div className='py-10 text-center text-red-500'>
        Error: {error?.message}
      </div>
    );
  }

  const products = rawProducts?.products?.map((product) => ({
    id: product.id,
    title: DOMPurify.sanitize(product.name),
    imageUrl: product.images?.[0]?.url || '/placeholder.png', // Fallback if no image
    price: product.prices?.[0]
      ? `${(product.prices[0].price / 100).toFixed(1)} ${product.prices[0].currency}`
      : 'Price not available',
    stock: product.stocks?.[0]?.stock || 'Stock not available',
  }));

  // Get the first three products for the hero section
  const heroImages = products?.slice(0, 3);

  return (
    <div className='grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {/* Hero Section */}
      <header className='mb-2 flex w-full flex-col items-center gap-4 bg-neutral-light p-20 md:flex-row md:items-center md:justify-between'>
        {/* Text Section */}
        <div className='flex-1 pr-10'>
          <h1 className='mb-4 text-xl font-bold underline md:text-3xl'>
            Find your next Computer Equipment!
          </h1>
          <p className='text-neutral-content'>With warranty you like!</p>
        </div>

        {/* Image Section */}
        <div className='flex flex-1 justify-end'>
          <div className='grid w-full grid-cols-3 gap-4 sm:grid-cols-3'>
            {heroImages?.map((product, index) => (
              <Image
                key={product.id || index}
                src={product.imageUrl}
                alt={product.title || `Product ${index + 1}`}
                className='h-auto w-full rounded-lg object-cover'
                loading='lazy'
                width={300}
                height={200}
              />
            ))}
          </div>
        </div>
      </header>
      {/* Best Sellers Section */}
      <section className='mb-2 flex flex-grow flex-col bg-neutral p-8'>
        <h2 className='mb-8 text-left text-2xl font-semibold'>Best Sellers</h2>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-1'>
          {products?.length ? (
            <ProductList products={products} />
          ) : (
            <p className='text-neutral-500 text-center'>
              No products available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsDisplay;
