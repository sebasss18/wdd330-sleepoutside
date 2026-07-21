import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount,loadHeaderFooter  } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

function formatCategoryName(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

document.querySelector(".products h2").textContent = `Top Products: ${formatCategoryName(category)}`;


const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();

updateCartCount();