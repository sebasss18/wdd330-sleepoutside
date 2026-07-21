import { getParam,updateCartCount,loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");

const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);

product.init();

updateCartCount();
