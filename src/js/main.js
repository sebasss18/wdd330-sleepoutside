import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
    try {
        const shouldAnimate = getLocalStorage("so-cart-animate");
        if (shouldAnimate) {
            // clear the flag immediately so it won't re-run
            localStorage.removeItem("so-cart-animate");

            const cartEl = document.querySelector(".cart");
            const svg = cartEl?.querySelector("svg");
            if (cartEl && svg) {
                cartEl.classList.add("cart--animate");
                const onEnd = () => {
                    cartEl.classList.remove("cart--animate");
                    svg.removeEventListener("animationend", onEnd);
                };
                svg.addEventListener("animationend", onEnd);
            }
        }
    } catch (e) {
        // silent fail
    }
});
