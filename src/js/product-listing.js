import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter, renderBreadcrumb } from "./utils.mjs";

// 1. Get the category from the URL (e.g., index.html?category=tents)
const category = getParam("category");

// 2. Create the data source and the list renderer
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

// 3. Create the instance of ProductList and pass the dynamic category
const myList = new ProductList(category, dataSource, listElement);

// 4. Initialize the list to fetch and display the products
// myList.init()

// 5. Update the page title to show the current category
const titleElement = document.querySelector(".title");
if (titleElement) {
  // This makes the first letter uppercase (e.g., "tents" -> "Tents")
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.innerHTML = `Top Products: ${formattedCategory}`;
}

// --- 6. SEARCH FUNCTIONALITY ---
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const productList = document.querySelector(".product-list");

  // Ensure the elements exist on this page before running
  if (!searchInput || !searchButton || !productList) return;

  function performSearch() {
    const query = searchInput.value.toLowerCase();
    // Select all rendered product cards (the <li> elements inside the <ul>)
    const productCards = productList.children;
    let hasVisibleProducts = false;

    Array.from(productCards).forEach(card => {
      // Ignore the "no results" message if it exists
      if (card.id === "no-results-msg") return;

      // Check if the text inside the card matches the search query
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = ""; // Show the card
        hasVisibleProducts = true;
      } else {
        card.style.display = "none"; // Hide the card
      }
    });

    // Handle displaying a "No products found" message
    let noResultsMsg = document.getElementById("no-results-msg");
    if (!hasVisibleProducts) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("li");
        noResultsMsg.id = "no-results-msg";
        noResultsMsg.textContent = "No products found matching your search.";
        noResultsMsg.style.textAlign = "center";
        noResultsMsg.style.width = "100%";
        noResultsMsg.style.fontSize = "1.2rem";
        noResultsMsg.style.marginTop = "2rem";
        productList.appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = "block";
    } else {
      if (noResultsMsg) noResultsMsg.style.display = "none";
    }
  }

  // Trigger search on button click
  searchButton.addEventListener("click", performSearch);

  // Trigger search when pressing the "Enter" key
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}
// --- 7. SORT FUNCTIONALITY ---

// Initialize the search event listeners
initSearch();
loadHeaderFooter().then(() => {

  const sortSelect = document.getElementById("sort-select");

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      console.log("Opción seleccionada:", e.target.value);
      myList.sortList(e.target.value);
    });
  }

  myList.init().then((list) => {
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);

    renderBreadcrumb(`${formattedCategory} (${list.length} items)`);
  });
});