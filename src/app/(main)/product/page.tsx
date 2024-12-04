'use client';

import React from 'react';
import ProductList from '@cps/components/product/productList';
import { useAllProducts } from '@cps/trpc/use-product';
import DOMPurify from 'dompurify';
import Button from '@cps/components/button';

const ProductsPage: React.FC = () => {
  const { data: rawProducts, isLoading, error } = useAllProducts();

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  const products = rawProducts?.map((product) => ({
    id: product.id,
    title: DOMPurify.sanitize(product.name),
    imageUrl: product.images?.[0]?.url || '/placeholder.png', // Fallback if no image
    price: product.prices?.[0]
  ? `${(product.prices[0].price / 100).toFixed(1)} ${product.prices[0].currency}`
  : 'Price not available',
    stock: product.stocks?.[0]?.stock || 'Stock not available',
  }));
  

  return (
<div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">

      {/* Main Content */}
      <nav className="bg-neutral p-4 flex justify-between">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-bold">GPS Demo</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm hover:underline">Home</a>
          <a href="#" className="text-sm hover:underline">Store</a>
        </div>
        <div className="flex gap-2">
          <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">T</Button>
          <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">C</Button>
          <Button className="w-8 h-8 rounded-full bg-neutral-light flex justify-center items-center">A</Button>
        </div>
      </nav>
        {/* Hero Section */}
  <header className="bg-neutral-light w-full p-20 mb-8 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between ">
        {/* Text Section */}
        <div className="flex-1 pr-10">
          <h1 className=" text-xl md:text-3xl font-bold mb-4 underline">Find your next Computer Equipment!</h1>
          <p className="text-neutral-content">With warranty you like!</p>
        </div>

        {/* Image Section */}
<div className="flex-1 flex justify-end">
  <div className="w-full grid grid-cols-3 sm:grid-cols-3 gap-4">
    <img
      src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Laptop"
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
    />
    <img
      src="https://images.pexels.com/photos/14309811/pexels-photo-14309811.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Speaker"
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
    />
    <img
      src="https://images.pexels.com/photos/3921883/pexels-photo-3921883.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Earbuds"
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
    />
    
  </div>
</div>

      </header>

        {/* Best Sellers Section */}
        <section className='flex flex-col bg-neutral p-8 mb-8'>
        <h2 className="text-2xl mb-8 font-semibold text-left">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-4">
          {/* <div className="grid gap-4"> */}
          {products?.length ? (
            <ProductList products={products} />
          ) : (
            <p className="text-neutral-500 text-center">No products available at the moment.</p>
          )}
          {/* </div> */}
         </div>
        </section>

      {/* Footer */}
      <footer className="bg-neutral-light p-6 rounded-lg mt-auto">
  {/* Footer Title */}
  <div className="flex justify-between items-center">
    <div className="flex flex-col">
      <h2 className="text-xl text-left font-bold mb-4 ">Compustore</h2>
      <h3 className="text-xl mb-6">About us</h3>
      <div className="flex flex-col text-left gap-4 mb-8">
        <a href="#" className="text-blue-600 hover:underline">Socials</a>
        <a href="#" className="text-blue-600 hover:underline">Store</a>
        <a href="#" className="text-blue-600 hover:underline">Contact</a>
      </div>
    </div>

    {/* Image Grid Section */}
    <div className="grid grid-cols-3 max-width height-auto gap-4 w-2/4">
      <img
      src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"
      alt="Laptop"
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
      />
      <img
        src="https://images.pexels.com/photos/3910542/pexels-photo-3910542.jpeg"
        alt="Camera"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <img
        src="https://images.pexels.com/photos/14438772/pexels-photo-14438772.jpeg"
        alt="Electronic gadgets"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    
      <img
        src="data:image/jpeg;base64,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"
        alt="Virtual reality lenses"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    
      <img
        src="data:image/webp;base64,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"
        alt="smart watch"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
            
      <img
        src="https://media.istockphoto.com/id/1547461285/photo/wireless-headphones.jpg?b=1&s=612x612&w=0&k=20&c=dHmEzonnQTFEM4ZnYD93ExACCVCKbfd15ElVCkmk0hg="
        alt="headset"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <img
        src="data:image/jpeg;base64,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"
        alt="earbuds"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <img
        src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="i-phones, ipads"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <img
        src="https://images.pexels.com/photos/1422223/pexels-photo-1422223.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="electronic gadgets"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  </div>
</footer>


    </div>
  );
};

export default ProductsPage;