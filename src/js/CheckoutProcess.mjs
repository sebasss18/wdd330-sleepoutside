import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

    init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
    }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    if (subtotal) {
      subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    const itemCount = document.querySelector(
      `${this.outputSelector} #itemCount`
    );

    if (itemCount) {
      itemCount.innerText = this.list.length;
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    this.shipping =
      this.list.length > 0
        ? 10 + (this.list.length - 1) * 2
        : 0;

    this.orderTotal =
      this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(
      `${this.outputSelector} #tax`
    );
    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`
    );
    const total = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );

    if (tax) {
      tax.innerText = `$${this.tax.toFixed(2)}`;
    }

    if (shipping) {
      shipping.innerText = `$${this.shipping.toFixed(2)}`;
    }

    if (total) {
      total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
  }
}