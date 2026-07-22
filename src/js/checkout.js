import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
updateCartCount();

const checkout = new CheckoutProcess("so-cart", "main");
checkout.init();

const zip = document.querySelector("#zip");

if (zip) {
  zip.addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });
}