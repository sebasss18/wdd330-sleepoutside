import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function renderProduct(product) {
  document.getElementById("product-brand").textContent =
    product.Brand?.Name || product.Brand?.Name || "";
  document.getElementById("product-name").textContent = product.Name;
  const image = document.getElementById("product-image");
  image.src = product.Image;
  image.alt = product.Name;
  document.getElementById(
    "product-price"
  ).textContent = `$${product.FinalPrice}`;
  document.getElementById("product-color").textContent =
    product.Colors?.[0]?.ColorName || "";
  document.getElementById("product-description").innerHTML =
    product.DescriptionHtmlSimple || "";
  const button = document.getElementById("addToCart");
  button.dataset.id = product.Id;
}

function showError(message) {
  const container = document.querySelector(".product-detail");
  container.innerHTML = `<p>${message}</p>`;
}

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    cartItems = cartItems ? [cartItems] : [];
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  if (product) {
    addProductToCart(product);
  }
}

function getProductIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("product");
}

async function init() {
  const productId = getProductIdFromQuery();
  if (!productId) {
    showError("Product not specified.");
    return;
  }

  const product = await dataSource.findProductById(productId);
  if (!product) {
    showError("Product not found.");
    return;
  }

  renderProduct(product);
  const button = document.getElementById("addToCart");
  if (button) {
    button.addEventListener("click", addToCartHandler);
  }
}

init();
