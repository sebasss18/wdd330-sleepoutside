import { getLocalStorage, setLocalStorage,showFlashMessage, alertMessage} from "./utils.mjs";

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
    //showFlashMessage(`${this.product.NameWithoutBrand} added to cart!`);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
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
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector(".product-price").textContent =
    `$${product.FinalPrice}`;

  document.querySelector(".product-color").textContent =
    product.Colors?.[0]?.ColorName || "N/A";

  document.querySelector(".product-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
  renderDiscount(product);
}



function renderDiscount(product) {
  const discountEl = document.querySelector(".product-discount");
  if (!discountEl) return;

  const original = product.SuggestedRetailPrice;
  const final = product.FinalPrice;

  if (original && original > final) {
    const amountOff = (original - final).toFixed(2);
    const percentOff = Math.round(((original - final) / original) * 100);
    discountEl.textContent = `Save $${amountOff} (${percentOff}% off)`;
    discountEl.classList.remove("hidden");
  } else {
    discountEl.textContent = "";
    discountEl.classList.add("hidden");
  }
}