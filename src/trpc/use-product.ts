import { trpc } from "./react";

// Hook to fetch a single product by ID
export const useProduct = (id: string) => {
  const { data, error, isLoading } = trpc.product.getProductById.useQuery({ id });

  if (isLoading) {
    return { data: null, error: null, isLoading };
  }

  if (error) {
    console.error('Error fetching product:', error);
    return { data: null, error, isLoading: false };
  }

  return { data, error: null, isLoading: false };
};

// Hook to fetch all products
export const useAllProducts = (input?: {
  page?: number;
  limit?: number;
  include?: {
    stocks?: boolean;
    prices?: boolean;
    images?: boolean;
    variants?: boolean;
  };
}) => {
  // Default input values
  const defaultInput = {
    page: 1,
    limit: 10,
    include: { stocks: false, prices: false, images: false, variants: false },
    ...input, // Override defaults with provided input
  };

  const { data, error, isLoading } = trpc.product.getAllProducts.useQuery(defaultInput);

  if (isLoading) {
    return { data: [], error: null, isLoading };
  }

  if (error) {
    console.error('Error fetching all products:', error);
    return { data: [], error, isLoading: false };
  }

  return { data, error: null, isLoading: false };
};