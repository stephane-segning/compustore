"use client";

import React from "react";
import { useProduct } from "@cps/trpc/use-product";
import Head from "next/head";
import Button from "@cps/components/button";
import ImageGallery from "@cps/components/image/image-gallery"; // Import your ImageGallery component

interface ProductDetailsPageProps {
  params: { id: string };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ params }) => {
  const { id } = params;
  const { data, error, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading product details. Please try again later.</p>
      </div>
    );
  }

  const { name, description, images, prices } = data;

  // Transform images data to match ImageGallery's expected format
  const galleryImages = images.map((image) => ({
    src: image.url,
    alt: image.title || "Product image",
  }));

  return (
    <div>
      {/* Head for SEO */}
      <Head>
        <title>{name} - Product Details</title>
        <meta name="description" content={description || ""} />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-gray-400 text-white p-4 flex justify-between">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-bold">GPS Demo</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm hover:underline">
            Home
          </a>
          <a href="#" className="text-sm hover:underline">
            Store
          </a>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-700">T</button>
          <button className="w-8 h-8 rounded-full bg-gray-700">C</button>
          <button className="w-8 h-8 rounded-full bg-gray-700">A</button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6">
        {/* Left Column: Product Details */}
        <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg">
          <h1 className="text-xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="font-semibold mb-2">
            This amazing product costs:{" "}
            <span className="text-green-500">
              ${prices[0]?.price || "N/A"} {prices[0]?.currency || ""}
            </span>
          </p>
          <p className="text-gray-700">Style: Food only</p>
          <Button className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Add to cart
          </Button>
        </div>

        {/* Right Column: Image Gallery */}
        <div className="lg:w-2/3">
          <ImageGallery images={galleryImages} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
