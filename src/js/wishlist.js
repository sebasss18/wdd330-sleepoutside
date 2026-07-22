import { loadHeaderFooter, getWishlist } from "./utils.mjs";

function wishlistItemTemplate(item) {
  const image =
    item.Images?.PrimaryMedium || item.Images?.PrimarySmall || item.Image || "";

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${item.Id}">
      <img src="${image}" alt="${item.NameWithoutBrand || item.Name}" />
      <h3 class="card__brand">${item.Brand?.Name || ""}</h3>
      <h2 class="card__name">${item.NameWithoutBrand || item.Name}</h2>
      <p class="product-card__price">$${item.FinalPrice}</p>
    </a>
  </li>`;
}

function renderWishlist() {
  const listElement = document.querySelector(".product-list");
  const items = getWishlist();

  if (items.length === 0) {
    listElement.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  listElement.innerHTML = items.map(wishlistItemTemplate).join("");
}

loadHeaderFooter();
renderWishlist();
