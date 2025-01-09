'use client';

import React, { useState } from 'react';
import { useCart } from '@cps/trpc/hooks/use-cart';
import CartRow from './cart-row';
import Button from '@cps/components/button';
import TableTH from './table-th';

interface CartDisplayProps {
  userId: string;
}

const CartDisplay: React.FC<CartDisplayProps> = ({ userId }) => {
  const { cart, isLoading, removeFromCart, clearCart, updateCartItemQuantity } = useCart(userId);
  const [newQuantity, setNewQuantity] = useState<{ [key: string]: number }>({});

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading cart...</div>;
  }

  if (!cart || !cart?.items || cart.items.length === 0) {
    return <div className="text-center text-gray-500">Your cart is empty.</div>;
  }

  const subtotal = cart.items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (itemId: string) => {
    const quantity = newQuantity[itemId];
    if (quantity) {
      updateCartItemQuantity(itemId, quantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setNewQuantity((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <table className="w-full border-collapse border border-neutral-300">
        <thead>
        <tr>
          <TableTH label="Product" />
          <TableTH label="Price" />
          <TableTH label="Quantity" />
          <TableTH label="Total" />
          <TableTH label="Actions" />
        </tr>
        </thead>
        <tbody>
        {cart.items.map((item) => (
          <CartRow
            key={item.id}
            item={{ ...item, productId: item.id }}
            newQuantity={newQuantity[item.id] || item.quantity}
            onQuantityChange={handleQuantityChange}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ))}
        </tbody>
      </table>
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</h3>
      </div>
      <div className="fa-solid fa-trash'">
        <Button color="danger" onClick={handleClearCart} data-testid="clear-cart-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"
               viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </Button>

      </div>
    </div>
  );
};

export default CartDisplay;
export type { CartDisplayProps };