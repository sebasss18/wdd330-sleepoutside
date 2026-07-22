import { getParam,updateCartCount, loadHeaderFooter } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");

const dataSource = new ExternalServices;

const product = new ProductDetails(productId, dataSource);

product.init();

updateCartCount();
loadHeaderFooter();