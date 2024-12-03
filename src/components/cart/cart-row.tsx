import React from "react";
import Button from "@cps/components/button";
import QuantityInput from "./quantity-input";

interface CartRowProps {
  item: {
    id: string;
    productId: string;
    price: number;
    quantity: number;
    product: {
      name: string;
    }
  };
  newQuantity: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onUpdateQuantity: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartRow: React.FC<CartRowProps> = ({
  item,
  newQuantity,
  onQuantityChange,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <tr key={item.id} className="text-center">
      <td className="border border-neutral-300 p-2">{item.product.name}</td>
      <td className="border border-neutral-300 p-2">${item.price.toFixed(2)}</td>
      <td className="border border-neutral-300 p-2">
        <QuantityInput
          value={newQuantity || item.quantity}
          onChange={(quantity) => onQuantityChange(item.id, quantity)}
        />
      </td>
      <td className="border border-neutral-300 p-2">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
      <td className="border border-neutral-300 p-2">
        <Button color="primary" onClick={() => onUpdateQuantity(item.id)}>
          Update
        </Button>
        <Button color="secondary" onClick={() => onRemoveItem(item.id)}>
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default CartRow;
export type { CartRowProps };