'use client';
import React, { useState } from "react";
import { useCart } from "@cps/trpc/hooks/use-cart";
import CartRow from "./cart-row";
import Button from "@cps/components/button";

interface CartDisplayProps {
  userId: string;
}

const CartDisplay: React.FC<CartDisplayProps> = ({ userId }) => {
  const { cart, isLoading, removeFromCart, clearCart, updateCartItemQuantity } = useCart(userId);
  const [newQuantity, setNewQuantity] = useState<{ [key: string]: number }>({});

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="text-center text-gray-500">Your cart is empty.</div>;
  }

  const subtotal = cart.items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
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
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {cart.items.map((item) => (
    <CartRow
      key={item.id} // Correct placement of the key prop
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
      <div className="flex justify-between items-center mt-6">
        <Button color="accent" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartDisplay;
