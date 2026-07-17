import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");

    const items = Array.isArray(cartItems)
      ? cartItems
      : cartItems
        ? [cartItems]
        : [];

    const cartFooter = document.querySelector(".cart-footer");

    if (items.length > 0) {
      const htmlItems = items.map(cartItemTemplate);
      this.listElement.innerHTML = htmlItems.join("");

      cartFooter.classList.remove("hide");

      const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);

      document.querySelector(".cart-total").innerHTML =
        `Total: $${total.toFixed(2)}`;
    } else {
      this.listElement.innerHTML =
        "<p>Your cart is currently empty. Go find some gear!</p>";

      cartFooter.classList.add("hide");
    }
  }

  init() {
    this.renderCartContents();
  }
}

loadHeaderFooter();