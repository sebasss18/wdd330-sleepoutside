import { updateCartCount, loadHeaderFooter,showFlashMessage,setLocalStorage,alertMessage } from "./utils.mjs";
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

  const myForm = document.forms["checkout-form"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) {
    try {
      await order.checkout("checkout-form");

      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html";
    } catch (error) {
      const errors = error.message?.message || error.message;
      if (errors && typeof errors === "object") {
        Object.values(errors).forEach((msg) => alertMessage(msg));
      } else {
        alertMessage("Something went wrong. Please check your information and try again.");
      }
    }
  }
});
