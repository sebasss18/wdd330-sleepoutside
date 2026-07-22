import {
  getLocalStorage,
  setLocalStorage,
  getWishlist,
  updateWishlistVisibility,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));

    const wishlistBtn = document.getElementById("wishlistBtn");
    this.updateHeartState(wishlistBtn);
    wishlistBtn.addEventListener("click", () => this.toggleWishlist(wishlistBtn));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    showFlashMessage(`${this.product.NameWithoutBrand} added to cart!`);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  isInWishlist() {
    return getWishlist().some((item) => item.Id === this.product.Id);
  }

  updateHeartState(button) {
    if (this.isInWishlist()) {
      button.classList.add("active");
      button.setAttribute("aria-label", "Remove from wishlist");
    } else {
      button.classList.remove("active");
      button.setAttribute("aria-label", "Add to wishlist");
    }
  }

  toggleWishlist(button) {
    let wishlist = getWishlist();

    if (this.isInWishlist()) {
      wishlist = wishlist.filter((item) => item.Id !== this.product.Id);
      setLocalStorage("so-wishlist", wishlist);
      showFlashMessage(`${this.product.NameWithoutBrand} removed from wishlist`);
    } else {
      wishlist.push(this.product);
      setLocalStorage("so-wishlist", wishlist);
      showFlashMessage(`${this.product.NameWithoutBrand} added to wishlist`);
    }

    this.updateHeartState(button);
    updateWishlistVisibility();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector(".product-brand").textContent = product.Brand.Name;

  document.querySelector(".product-name").textContent =
    product.NameWithoutBrand;

  const productImage = document.querySelector(".product-image");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector(".product-price").textContent =
    `$${product.FinalPrice}`;

  document.querySelector(".product-color").textContent =
    product.Colors?.[0]?.ColorName || "N/A";

  document.querySelector(".product-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

function showFlashMessage(message) {
  const flash = document.createElement("div");
  flash.className = "flash-message";
  flash.textContent = message;
  document.body.appendChild(flash);

  setTimeout(() => flash.remove(), 2000);
}
