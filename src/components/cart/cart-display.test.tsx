import { useCart } from '@cps/trpc/hooks/use-cart';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CartDisplay from './cart-display';

// Mock useCart hook
jest.mock('@cps/trpc/hooks/use-cart', () => ({
  useCart: jest.fn(),
}));

jest.mock('@cps/components/button', () => {
  return ({
    children,
    ...props
  }: React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >) => <button {...props}>{children}</button>;
});

describe('CartDisplay Component', () => {
  const mockUseCart = useCart as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state when isLoading is true', () => {
    mockUseCart.mockReturnValue({ isLoading: true });

    render(<CartDisplay userId='123' username='testuser' />);

    expect(screen.getByText(/loading cart/i)).toBeInTheDocument();
  });

  it('displays empty cart message when cart is empty', () => {
    mockUseCart.mockReturnValue({ isLoading: false, cart: { items: [] } });

    render(<CartDisplay userId='123' username='testuser' />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('displays cart items and subtotal when cart has items', () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [
          { id: '1', product: { name: 'Product A' }, price: 10, quantity: 2 },
          { id: '2', product: { name: 'Product B' }, price: 20, quantity: 1 },
        ],
      },
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      updateCartItemQuantity: jest.fn(),
    });

    render(<CartDisplay userId='123' username='testuser' />);

    // Check for product names
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();

    // Check for subtotal
    expect(screen.getByText('Subtotal: $40.00')).toBeInTheDocument();
  });

  it('calls updateCartItemQuantity when Update button is clicked', () => {
    const updateCartItemQuantity = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [
          { id: '1', product: { name: 'Product A' }, price: 10, quantity: 2 },
        ],
      },
      updateCartItemQuantity,
    });

    render(<CartDisplay userId='123' username='testuser' />);

    fireEvent.change(screen.getByDisplayValue('2'), { target: { value: '3' } });
    fireEvent.click(screen.getByText(/update/i));

    expect(updateCartItemQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('calls removeFromCart when Remove button is clicked', () => {
    const removeFromCart = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [
          { id: '1', product: { name: 'Product A' }, price: 10, quantity: 2 },
        ],
      },
      removeFromCart,
    });

    render(<CartDisplay userId='123' username='testuser' />);

    fireEvent.click(screen.getByText(/remove/i));
    expect(removeFromCart).toHaveBeenCalledWith('1');
  });

  it('calls clearCart when Clear Cart button is clicked', () => {
    const clearCart = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      cart: {
        items: [
          { id: '1', product: { name: 'Product A' }, price: 10, quantity: 2 },
        ],
      },
      clearCart,
    });

    render(<CartDisplay userId='123' username='testuser' />);

    fireEvent.click(screen.getByTestId('clear-cart-button'));
    expect(clearCart).toHaveBeenCalled();
  });
});
