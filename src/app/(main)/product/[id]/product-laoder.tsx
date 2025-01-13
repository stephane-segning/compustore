'use client';
import ErrorState from '@cps/components/common/error-state';
import LoadingState from '@cps/components/common/loading-state';
import ProductDetails from '@cps/components/product/product-details';
import { useProduct } from '@cps/trpc/hooks/use-product';
import React from 'react';

interface ProductLoaderProps {
  id: string;
}

const ProductLoader: React.FC<ProductLoaderProps> = ({ id }) => {
  const { data, error, isLoading } = useProduct(id);

  if (isLoading) return <LoadingState />;
  if (error || !data)
    return (
      <ErrorState message='Error loading product details. Please try again later.' />
    );

  return <ProductDetails product={data} />;
};

export default ProductLoader;
