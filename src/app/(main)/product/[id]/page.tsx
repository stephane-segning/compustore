import React from 'react';
import ProductLoader from './product-laoder';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const { id } = await params;

  return (
    <div>
      <ProductLoader id={id} />
    </div>
  );
};

export default ProductDetailsPage;
