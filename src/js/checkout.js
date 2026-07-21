import { updateCartCount, loadHeaderFooter,showFlashMessage,setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
updateCartCount();

const services = new ExternalServices();
const order = new CheckoutProcess("so-cart", ".order-summary", services);
order.init();

document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

document.getElementById("checkoutButton").addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    await order.checkout("checkout-form");

    setLocalStorage("so-cart", []);
    showFlashMessage("Payment successful! Thank you for your order.", "success");

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    console.error(error);
    showFlashMessage("Something went wrong. Please check your information and try again.", "error");
  }
});