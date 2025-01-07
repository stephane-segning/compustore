"use client";
import { api } from '../react';
import { useEffect, useState } from 'react';
import { setCartCookie, clearCartCookie, getCartCookie } from '@cps/utils/cart-cookie';

export const useCart = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<any>(getCartCookie());

  const { data, refetch: refetchCartFromApi } = api.cart.getCart.useQuery(
    { userId },
    { enabled: !!userId }
  );

  useEffect(() => {
    if (data) {
      setCart(data);
      setCartCookie(data);
    }
  }, [data]);

  const addToCart = api.cart.addToCart.useMutation({
    onMutate: async ({ productId, quantity }) => {
      setIsLoading(true);
      const updatedCart = {
        ...cart,
        items: [
          ...cart.items,
          { productId, quantity }, 
        ],
      };
      setCart(updatedCart);
      setCartCookie(updatedCart);
    },
    onSuccess: () => {
      refetchCartFromApi();
    },
    onSettled: () => setIsLoading(false),
  });

  const updateCart = api.cart.updateCart.useMutation({
    onMutate: async ({ itemId, quantity }) => {
      setIsLoading(true);
      const updatedCart = {
        ...cart,
        items: cart.items.map((item: any) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      };
      setCart(updatedCart);
      setCartCookie(updatedCart);
    },
    onSuccess: () => {
      refetchCartFromApi();
    },
    onSettled: () => setIsLoading(false),
  });

  const removeFromCart = api.cart.removeFromCart.useMutation({
    onMutate: async ({ itemId }) => {
      setIsLoading(true);
      const updatedCart = {
        ...cart,
        items: cart.items.filter((item: any) => item.id !== itemId),
      };
      setCart(updatedCart);
      setCartCookie(updatedCart);
    },
    onSuccess: () => {
      refetchCartFromApi();
    },
    onSettled: () => setIsLoading(false),
  });

  const clearCart = api.cart.clearCart.useMutation({
    onMutate: async () => {
      setIsLoading(true);
      setCart({ items: [] });
      clearCartCookie();
    },
    onSuccess: () => {
      refetchCartFromApi();
    },
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
    refetchCartFromApi,
  };
};
