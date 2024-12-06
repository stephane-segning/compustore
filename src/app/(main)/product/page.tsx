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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
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
        src="https://m.media-amazon.com/images/I/51-X+HBW4JL.jpg"
        alt="Virtual reality lenses"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    
      <img
        src="https://s.alicdn.com/@sc04/kf/H78a32345f07849db8a5b293f6ddf6e84M.jpg_720x720q50.jpg"
        alt="smart watch"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
            
      <img
        src="https://assets2.razerzone.com/images/pnx.assets/eacc83c0643ed2da8c9e98968f8aa215/headset-landingpg-500x500-barracuda.jpg"
        alt="headset"
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwwEUGDBT6nX3S5IhXzI9PMzTgJWoRBHyuXg&s"
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