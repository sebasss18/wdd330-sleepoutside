import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// 1. Get the category from the URL (e.g., index.html?category=tents)
const category = getParam("category");

// 2. Create the data source and the list renderer
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

// 3. Create the instance of ProductList and pass the dynamic category
const myList = new ProductList(category, dataSource, listElement);

// 4. Initialize the list to fetch and display the products
myList.init();

// 5. Update the page title to show the current category
const titleElement = document.querySelector(".title");
if (titleElement) {
  // This makes the first letter uppercase (e.g., "tents" -> "Tents")
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.innerHTML = `Top Products: ${formattedCategory}`;
}