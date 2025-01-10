'use client';

import React from 'react';
import ProductList from '@cps/components/product/productList';
import { useAllProducts } from '@cps/trpc/hooks/use-product';
import DOMPurify from 'dompurify';
import Image from 'next/image';

const ProductsDisplay: React.FC = () => {
  const { data: rawProducts, isLoading, error, isError } = useAllProducts({ thumbnail: true, prices: true });

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-danger">Error: {error?.message}</div>;
  }

  console.log({ rawProducts });

  // O(p) = n ~> 10p = 10n ~> O(n)
  const products = rawProducts?.products?.map((product) => ({
    id: product.id,
    title: DOMPurify.sanitize(product.name),
    imageUrl: product.thumbnail?.url || '/placeholder.png', // Fallback if no image
    price: product.prices?.[0]
      ? `${(product.prices[0].price / 100).toFixed(1)} ${product.prices[0].currency}`
      : 'Price not available',
    stock: product.stocks?.[0]?.stock || 'Stock not available',
  }));

  // Get the first three products for the hero section
  const heroImages = products?.slice(0, 3);

  return (
    <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {/* Hero Section */}
      <header
        className="bg-neutral-light mb-2 w-full p-20 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between ">
        {/* Text Section */}
        <div className="flex-1 pr-10">
          <h1 className=" text-xl md:text-3xl font-bold mb-4 underline">Find your next Computer Equipment!</h1>
          <p className="text-neutral-content">With warranty you like!</p>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-end">
          <div className="w-full grid grid-cols-3 sm:grid-cols-3 gap-4">
            {heroImages?.map((product, index) => (
              <Image
                key={product.id || index}
                src={product.imageUrl}
                alt={product.title || `Product ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
                width={300}
                height={200}
              />
            ))}

          </div>
        </div>

      </header>
      {/* Best Sellers Section */}
      <section className="flex flex-col bg-neutral p-8 mb-2 flex-grow ">
        <h2 className="text-2xl mb-8 font-semibold text-left">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {products?.length ? (
            <ProductList products={products} />
          ) : (
            <p className="text-neutral-500 text-center">No products available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsDisplay;