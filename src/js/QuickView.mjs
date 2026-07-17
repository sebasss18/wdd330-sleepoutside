export default class QuickView {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.modal = document.querySelector("#quick-view-modal");
    this.modalBody = document.querySelector("#modal-body");
    this.closeButton = document.querySelector("#close-modal");

    // We only add the click event if the close button exists on the page
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => {
        this.close();
      });
    }
  }

  async show(productId) {
    // Stop the function if the modal HTML isn't on the page
    if (!this.modal || !this.modalBody) {
      return;
    }

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
    // Only try to hide it if the modal exists
    if (this.modal) {
      this.modal.classList.add("hidden");
    }
  }
}