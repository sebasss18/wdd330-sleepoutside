import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

async function initPage() {
  await loadHeaderFooter();
  updateCartCount();

  const cart = new ShoppingCart(document.querySelector(".product-list"));
  cart.init();
}

initPage();