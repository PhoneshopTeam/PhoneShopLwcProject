import { LightningElement, api, wire, track } from 'lwc';

const DELETE_TEXT = "You have removed this item from your basket"
const READ_CLASS  = "lgc-bg-inverse";
const READ_ONLY_CLASS = "lgc-bg";

export default class ItemBasket extends LightningElement {
    ///@api
    contactId = '0032w00000INmlwAAD';
    //orderId = 'a012w00000NmDdVAAV';
    @api product;
    @api basketId;
    @track hasRendered = true;
    basketItem;
                            //Basket__c.UnitPrice__c

    quantityUpd; //=1;       //Basket__c.Quantity__c
    //totalPrice;  //='';   //Basket__c.TotalPrice__c
    checkboxVal = true;     //Basket__c.ProductStatus__c
    readOnly = false;

    get quantity() {
        return this.basketId.Quantity__c;
    }

    get totalPrice() {
        return this.basketId.TotalPrice__c;
    }

    get checkboxValue() {

        return this.basketId.ProductStatus__c;
    }

    get productId() {
        return this.basketId.ProductId__c;
    }

    get price() {
        return this.basketId.ProductId__r.Price__c;
    }
}