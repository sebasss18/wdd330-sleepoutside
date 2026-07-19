import { renderListWithTemplate, loadHeaderFooter } from "./utils.mjs";
import QuickView from "./QuickView.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.quickView = new QuickView(dataSource);
    this.list = [];
  }

  async init() {
    // Fetch the list of products from the API based on the category
    this.list = await this.dataSource.getData(this.category);

    // Render the entire list returned by the API
    this.renderList(this.list);

    return this.list;
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    this.addQuickViewEvents();
  }
  sortList(criteria) {
    if (criteria === "name") {
      this.list.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (criteria === "price") {
      this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(this.list);
  }

  addQuickViewEvents() {
    const buttons = document.querySelectorAll(".quick-view-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.quickView.show(button.dataset.id);
      });
    });
  }
}

loadHeaderFooter()