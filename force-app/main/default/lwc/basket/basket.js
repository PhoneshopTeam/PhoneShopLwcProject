import { LightningElement, wire, track } from 'lwc';
import getProductList from '@salesforce/apex/BasketController.getProductList';

export default class Basket extends LightningElement {
    products;
    handleCheckbox;
    totalAmount;
    inputValue=1;

    /*@wire(getProductList)
    products;*/

    @wire(getProductList)
	wiredProducts(result) {
		this.products = result;
    }
    
    handlePrice(event) {
       /* let i;
        let amount=this.template.querySelectorAll('c-item-basket');
        for(i=0; i<amount.length; i++) {
            amount[i].totalAmount = event.detail;
        }*/
        this.totalAmount = event.detail.fullPrice;

        console.log("totalAmount: "+this.totalAmount);
    }

    /*handleQuantity(event) {
        this.inputValue=event.target.value;
        console.log("handleQuantity: "+this.inputValue);

    }*/
}