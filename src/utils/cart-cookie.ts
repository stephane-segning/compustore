import Cookies from "js-cookie";

const CART_COOKIE_NAME = "cart-cookies";

/**
 * Set cart data in cookies
 * @param cart - The cart data to save
 */
export function setCartCookie(cart: any) {
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), { expires: 7, path: "/" }); // Expires in 7 days
}

/**
 * Get cart data from cookies
 * @returns The cart data or a default empty structure
 */
export function getCartCookie() {
  const cart = Cookies.get(CART_COOKIE_NAME);
  return cart ? JSON.parse(cart) : { items: [] };
}

/**
 * Clear the cart data from cookies
 */
export function clearCartCookie() {
  Cookies.remove(CART_COOKIE_NAME, { path: "/" });
}
