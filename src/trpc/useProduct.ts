import { trpc } from "./react";

// Hook to fetch a single product by ID
export const useProduct = (id: string) => {
  return trpc.product.getProductById.useQuery({ id });
};
