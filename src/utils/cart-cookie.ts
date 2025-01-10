import Cookies from 'js-cookie';

const CART_COOKIE_NAME = 'cart-cookies';

/**
 * Set cart data in cookies
 */
export function setCartCookie(cartId: string) {
  Cookies.set(CART_COOKIE_NAME, cartId, { expires: 7, path: '/' });
}

/**
 * Get cart data from cookies
 */
export function getCartCookie() {
  const cartId = Cookies.get(CART_COOKIE_NAME);
  return cartId ? cartId : undefined;
}

/**
 * Clear the cart data from cookies
 */
export function clearCartCookie() {
  Cookies.remove(CART_COOKIE_NAME, { path: '/' });
}
