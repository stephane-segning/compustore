'use client';
import React, { useState } from "react";
import { useCart } from "@cps/trpc/hooks/use-cart";
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

  // Calculate subtotal
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 p-2">{item.productId}</td>
              <td className="border border-gray-300 p-2">${item.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  min="1"
                  value={newQuantity[item.id] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="border border-gray-300 p-2 rounded w-20"
                />
              </td>
              <td className="border border-gray-300 p-2">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <Button
                   color="primary"
                  onClick={() => handleUpdateQuantity(item.id)}
                >
                  Update
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</h3>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          color="accent"
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartDisplay;