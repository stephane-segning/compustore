import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartDisplay from './cart-display';
import { useCart } from '@cps/trpc/hooks/use-cart';


// Mock useCart hook
jest.mock('@cps/trpc/hooks/use-cart', () => ({
  useCart: jest.fn(),
}));

jest.mock('@cps/components/button', () => {
    return ({ children, ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
      <button {...props}>{children}</button>
    );
  });
  

describe('CartDisplay Component', () => {
  const mockUseCart = useCart as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state when isLoading is true', () => {
    mockUseCart.mockReturnValue({ isLoading: true });

    render(<CartDisplay userId="123" />);

    expect(screen.getByText(/loading cart/i)).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    mockUseCart.mockReturnValue({ isLoading: false, cart: { items: [] } });

    render(<CartDisplay userId="123" />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('displays cart items and subtotal when cart has items', () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [
          { id: '1', productId: 'Product A', price: 10, quantity: 2 },
          { id: '2', productId: 'Product B', price: 20, quantity: 1 },
        ],
      },
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      updateCartItemQuantity: jest.fn(),
    });

    render(<CartDisplay userId="123" />);

    expect(screen.getByText(/Product A/i)).toBeInTheDocument();
    expect(screen.getByText(/Product B/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: \$40.00/i)).toBeInTheDocument();
  });

  it('calls updateCartItemQuantity when Update button is clicked', () => {
    const updateCartItemQuantity = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [{ id: '1', productId: 'Product A', price: 10, quantity: 2 }],
      },
      updateCartItemQuantity,
    });

    render(<CartDisplay userId="123" />);

    const input = screen.getByDisplayValue('2');
    fireEvent.change(input, { target: { value: '3' } }); 

    const updateButton = screen.getByText(/update/i);
    fireEvent.click(updateButton);

    expect(updateCartItemQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('calls removeFromCart when Remove button is clicked', () => {
    const removeFromCart = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [{ id: '1', productId: 'Product A', price: 10, quantity: 2 }],
      },
      removeFromCart,
    });

    render(<CartDisplay userId="123" />);

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(removeFromCart).toHaveBeenCalledWith('1');
  });

  it('calls clearCart when Clear Cart button is clicked', () => {
    const clearCart = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: { items: [{ id: '1', productId: 'Product A', price: 10, quantity: 2 }] },
      clearCart,
    });

    render(<CartDisplay userId="123" />);

    const clearButton = screen.getByText(/clear cart/i);
    fireEvent.click(clearButton);

    expect(clearCart).toHaveBeenCalled();
  });
});
