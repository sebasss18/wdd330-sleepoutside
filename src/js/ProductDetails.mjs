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
  }

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