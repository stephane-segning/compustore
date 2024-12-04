import { renderHook, act } from "@testing-library/react";
import { useCart } from "./use-cart";

// Mock the `api` implementation directly
jest.mock("../react", () => ({
  api: {
    cart: {
      getCart: {
        useQuery: jest.fn(),
      },
      addToCart: {
        useMutation: jest.fn(),
      },
      updateCart: {
        useMutation: jest.fn(),
      },
      removeFromCart: {
        useMutation: jest.fn(),
      },
      clearCart: {
        useMutation: jest.fn(),
      },
    },
  },
}));

const mockedApi = require("../react").api;

describe("useCart hook", () => {
  const userId = "test-user-id";

  beforeEach(() => {
    jest.clearAllMocks();

    mockedApi.cart.getCart.useQuery.mockReturnValue({
      data: { items: [] },
      refetch: jest.fn(),
    });

    mockedApi.cart.addToCart.useMutation.mockReturnValue({
      mutate: jest.fn((input, options) => {
        options?.onSuccess?.();
        options?.onSettled?.();
      }),
    });

    mockedApi.cart.updateCart.useMutation.mockReturnValue({
      mutate: jest.fn((input, options) => {
        options?.onSuccess?.();
        options?.onSettled?.();
      }),
    });

    mockedApi.cart.removeFromCart.useMutation.mockReturnValue({
      mutate: jest.fn((input, options) => {
        options?.onSuccess?.();
        options?.onSettled?.();
      }),
    });

    mockedApi.cart.clearCart.useMutation.mockReturnValue({
      mutate: jest.fn((input, options) => {
        options?.onSuccess?.();
        options?.onSettled?.();
      }),
    });
  });

  it("should fetch cart data for a user", () => {
    renderHook(() => useCart(userId));
    expect(mockedApi.cart.getCart.useQuery).toHaveBeenCalledWith(
      { userId },
      { enabled: !!userId }
    );
  });

  it("should add an item to the cart", async () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.addToCart("product-1", 2));
    expect(mockedApi.cart.addToCart.useMutation().mutate).toHaveBeenCalledWith({
      productId: "product-1",
      quantity: 2,
    });
  });

  it("should update item quantity in the cart", async () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.updateCart("item-1", 3));
    expect(mockedApi.cart.updateCart.useMutation().mutate).toHaveBeenCalledWith({
      itemId: "item-1",
      quantity: 3,
    });
  });

  it("should update cart item quantity using updateCartItemQuantity", async () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.updateCartItemQuantity("item-2", 4));
    expect(mockedApi.cart.updateCart.useMutation().mutate).toHaveBeenCalledWith({
      itemId: "item-2",
      quantity: 4,
    });
  });

  it("should remove an item from the cart", async () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.removeFromCart("item-1"));
    expect(mockedApi.cart.removeFromCart.useMutation().mutate).toHaveBeenCalledWith({
      itemId: "item-1",
    });
  });

  it("should clear the cart", async () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.clearCart());
    expect(mockedApi.cart.clearCart.useMutation().mutate).toHaveBeenCalledWith({
      userId,
    });
  });

  it("should refetch the cart", () => {
    const { result } = renderHook(() => useCart(userId));
    act(() => result.current.refetchCart());
    expect(mockedApi.cart.getCart.useQuery().refetch).toHaveBeenCalled();
  });

  it("should handle loading state during addToCart mutation", async () => {
    const { result } = renderHook(() => useCart(userId));
    expect(result.current.isLoading).toBe(false);

    act(() => result.current.addToCart("product-1", 2));
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state during updateCart mutation", async () => {
    const { result } = renderHook(() => useCart(userId));
    expect(result.current.isLoading).toBe(false);

    act(() => result.current.updateCart("item-1", 5));
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state during clearCart mutation", async () => {
    const { result } = renderHook(() => useCart(userId));
    expect(result.current.isLoading).toBe(false);

    act(() => result.current.clearCart());
    expect(result.current.isLoading).toBe(false);
  });
});
