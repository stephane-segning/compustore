"use client";
import { api } from '../react';
import { useState } from 'react';

export const useCart = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: cart, refetch: refetchCart } = api.cart.getCart.useQuery(
    { userId },
    {
      enabled: !!userId,
    }
  );

  const addToCart = api.cart.addToCart.useMutation({
    onMutate: async () => setIsLoading(true),
    onSuccess: () => refetchCart(),
    onSettled: () => setIsLoading(false),
  });

  const updateCart = api.cart.updateCart.useMutation({
    onMutate: async () => setIsLoading(true),
    onSuccess: () => refetchCart(),
    onSettled: () => setIsLoading(false),
  });

  const removeFromCart = api.cart.removeFromCart.useMutation({
    onMutate: async () => setIsLoading(true),
    onSuccess: () => refetchCart(),
    onSettled: () => setIsLoading(false),
  });

  const clearCart = api.cart.clearCart.useMutation({
    onMutate: async () => setIsLoading(true),
    onSuccess: () => refetchCart(),
    onSettled: () => setIsLoading(false),
  });

  return {
    cart,
    isLoading,
    addToCart: (productId: string, quantity: number) => addToCart.mutate({ productId, quantity }),
    updateCart: (itemId: string, quantity: number) => updateCart.mutate({ itemId, quantity }),
    removeFromCart: (itemId: string) => removeFromCart.mutate({ itemId }),
    updateCartItemQuantity: (itemId: string, quantity: number) => updateCart.mutate({ itemId, quantity }),
    clearCart: () => clearCart.mutate({ userId }),
    refetchCart,
  };
};
