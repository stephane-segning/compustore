import Cookies from 'js-cookie';
import { setCartCookie, getCartCookie, clearCartCookie } from '../cart-cookie';
jest.mock('js-cookie');

describe('Cart Cookie Utilities', () => {
  const CART_COOKIE_NAME = 'cart-cookies';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setCartCookie', () => {
    it('should set the cart cookie with the correct parameters', () => {
      const mockCartId = 'test-cart-id';
      setCartCookie(mockCartId);

      expect(Cookies.set).toHaveBeenCalledWith(CART_COOKIE_NAME, mockCartId, { expires: 7, path: '/' });
    });
  });

  describe('getCartCookie', () => {
    it('should return the cart ID if the cookie exists', () => {
      const mockCartId = 'test-cart-id';
      (Cookies.get as jest.Mock).mockReturnValue(mockCartId);

      const cartId = getCartCookie();

      expect(Cookies.get).toHaveBeenCalledWith(CART_COOKIE_NAME);
      expect(cartId).toBe(mockCartId);
    });

    it('should return undefined if the cookie does not exist', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const cartId = getCartCookie();

      expect(Cookies.get).toHaveBeenCalledWith(CART_COOKIE_NAME);
      expect(cartId).toBeUndefined();
    });
  });

  describe('clearCartCookie', () => {
    it('should remove the cart cookie with the correct parameters', () => {
      clearCartCookie();

      expect(Cookies.remove).toHaveBeenCalledWith(CART_COOKIE_NAME, { path: '/' });
    });
  });
});
