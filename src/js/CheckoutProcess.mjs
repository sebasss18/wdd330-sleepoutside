import { getLocalStorage, formDataToJSON } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector, dataSource) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.dataSource = dataSource;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key)|| [];
        //this.calculateItemSummary();
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

        const subtotalElement = document.querySelector(`${this.outputSelector} #order-subtotal`);
        subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;

        this.calculateOrderTotal();
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;

        this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();

    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #order-tax`);
        tax.innerText = `$${this.tax.toFixed(2)}`;

        const shipping = document.querySelector(`${this.outputSelector} #order-shipping`);
        shipping.innerText = `$${this.shipping.toFixed(2)}`;

        const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1,
        }));
    }
    async checkout(form) {
        const formElement = document.forms[form];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal.toFixed(2);
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping;
        json.items = this.packageItems(this.list);

        try {
            const response = await this.dataSource.checkout(json);
            return response;
        } catch (err) {
            throw err;
        }
    }
}   