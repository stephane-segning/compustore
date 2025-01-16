import { trpc } from '../react';

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

type UseAllProduct = {
  page?: number;
  limit?: number;

  stocks?: boolean;
  prices?: boolean;
  images?: boolean;
  variants?: boolean;
  thumbnail?: boolean;
};

// Hook to fetch all products
export const useAllProducts = ({
                                 page = 1,
                                 limit = 10,
                                 stocks = false, prices = false, images = false, variants = false, thumbnail = false,
                               }: UseAllProduct = {}) => {

  return trpc.product.getAllProducts.useQuery({
    page, limit, include: {
      stocks,
      prices,
      images,
      variants,
      thumbnail,
    },
  });
};