import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // This safely handles if the cart is an array, a single object, or completely empty
  const items = Array.isArray(cartItems)
    ? cartItems
    : cartItems
      ? [cartItems]
      : [];

  // Check if there are actually items to display
  if (items.length > 0) {
    const htmlItems = items.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    // 1. Show the footer
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");

    // 2. Calculate the total
    const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);

    // 3. Display the total
    const totalElement = document.querySelector(".cart-total");
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    // If empty, show a nice message instead of a blank space
    document.querySelector(".product-list").innerHTML = "<p>Your cart is currently empty. Go find some gear!</p>";
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

  return newItem;
}

renderCartContents();