export default class QuickView {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.modal = document.querySelector("#quick-view-modal");
    this.modalBody = document.querySelector("#modal-body");
    this.closeButton = document.querySelector("#close-modal");

    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  async show(productId) {
    const product = await this.dataSource.findProductById(productId);

    this.modalBody.innerHTML = `
      <img src="${product.Image.replace("../", "/")}" alt="${product.Name}">
      <h2>${product.Name}</h2>
      <p>${product.Brand.Name}</p>
      <p>$${product.FinalPrice}</p>
    `;

    this.modal.classList.remove("hidden");
  }

  close() {
    this.modal.classList.add("hidden");
  }
}