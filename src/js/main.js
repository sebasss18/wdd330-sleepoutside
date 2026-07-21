import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

updateCartCount();
