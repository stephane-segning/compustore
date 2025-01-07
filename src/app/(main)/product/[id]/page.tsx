
import React from "react";
import Head from "next/head";
import ProductLoader from "./product-laoder";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <Head>
        <title>Product Details</title>
      </Head>
      <ProductLoader id={id} />
    </div>
  );
};

export default ProductDetailsPage;
