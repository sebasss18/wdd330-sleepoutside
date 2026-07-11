import { renderListWithTemplate } from "./utils.mjs";

//rule You should NOT display the extras as we do not have detail pages for those yet
const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="/images/tents/${product.Image.split("/").pop()}" alt="Image of ${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.quickView = new QuickView(dataSource);
  }
  
  async init() {
    const list = await this.dataSource.getData();
    const filteredList = list.filter((product) => allowedIds.includes(product.Id));
    this.renderList(filteredList);
  }
  
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    
    this.addQuickViewEvents();
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
