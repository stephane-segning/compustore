'use client';
import { api } from '../react';
import { useEffect, useState } from 'react';
import { clearCartCookie, getCartCookie, setCartCookie } from '@cps/utils/cart-cookie';

export const useCart = (userId: string | undefined) => {
  const [cartId, setCartId] = useState<string | undefined>(getCartCookie());

  const { data, refetch: refetchCartFromApi, isPending } = api.cart.getCart.useQuery(
    { userId: userId },
    { enabled: !!userId },
  );

  useEffect(() => {
    if (cartId) {
      setCartCookie(cartId);
    } else {
      clearCartCookie();
    }
  }, [cartId]);

  useEffect(() => {
    setCartId(data?.id);
  }, [data]);

  const addToCart = api.cart.addToCart.useMutation({
    onSuccess: () => refetchCartFromApi(),
  });

  const updateCart = api.cart.updateCart.useMutation({
    onSuccess: () => refetchCartFromApi(),
  });

  const removeFromCart = api.cart.removeFromCart.useMutation({
    onSuccess: () => refetchCartFromApi(),
  });

  const clearCart = api.cart.clearCart.useMutation({
    onSuccess: () => refetchCartFromApi(),
  });

  return {
    cart: data,
    isLoading: Boolean(isPending || addToCart.isPending || updateCart.isPending || removeFromCart.isPending || clearCart.isPending),
    addToCart: (productId: string, quantity: number) => addToCart.mutate({ productId, quantity }),
    updateCart: (itemId: string, quantity: number) => updateCart.mutate({ itemId, quantity }),
    removeFromCart: (itemId: string) => removeFromCart.mutate({ itemId }),
    updateCartItemQuantity: (itemId: string, quantity: number) => updateCart.mutate({ itemId, quantity }),
    clearCart: () => clearCart.mutate({ userId }),
    refetchCartFromApi,
  };
};