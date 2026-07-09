import { getLocalStorage } from "./utils.mjs";

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
