import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    // This is the flag that will trigger the animation on the cart icon when the page reloads

    setLocalStorage("so-cart-animate", true);

    try {
      const cartEl = document.querySelector(".cart");
      const svg = cartEl?.querySelector("svg");
      if (cartEl && svg) {
        cartEl.classList.add("cart--animate");
        const handleAnimationEnd = () => {
          cartEl.classList.remove("cart--animate");
          svg.removeEventListener("animationend", handleAnimationEnd);
        };
        svg.addEventListener("animationend", handleAnimationEnd);
      }
    } catch (e) {
      // fail silently if DOM isn't present
    }
  }
  //this is the flag that will trigger the animation on the cart icon when the page reloads
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector(".product-brand").textContent =
    product.Brand.Name;

  document.querySelector(".product-name").textContent =
    product.NameWithoutBrand;

  const productImage = document.querySelector(".product-image");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector(".product-price").textContent =
    `$${product.FinalPrice}`;

  document.querySelector(".product-color").textContent =
    product.Colors?.[0]?.ColorName || "N/A";

  document.querySelector(".product-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}