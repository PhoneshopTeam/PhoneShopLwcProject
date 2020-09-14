import { LightningElement, api, wire, track } from 'lwc';
//import getBasketItem from '@salesforce/apex/BasketController.getBasketItem';
const DELETE_TEXT = "You have removed this item from your basket"
const READ_CLASS  = "lgc-bg-inverse";
const READ_ONLY_CLASS = "lgc-bg";

export default class ItemBasket extends LightningElement {
    //@api
    contactId = '0032w00000INmlwAAD';
    //orderId = 'a012w00000NmDdVAAV';
    @api product;
    @api basketId;
    @track hasRendered = true;
    basketItem;
                            //Basket__c.UnitPrice__c
    //productId;
    quantityUpd; //=1;       //Basket__c.Quantity__c
    totalPrice;  //='';   //Basket__c.TotalPrice__c
    checkboxVal = true;     //Basket__c.ProductStatus__c
    readOnly = false;

    productIds;
    phonePrice;
    quantityClass;

    /*@wire(getBasketItem, {contactId : '$contactId', orderId : this.orderId})
    wiredBasket({ error, data }) {
        if (data) {
            this.error = undefined;
            this.basketItem = data;
            //this.quantity=this.basketItem.Quantity__c;
            
          } else if (error) {
            this.error = error;
          }
    }*/


    get quantity() {
        return this.basketId.Quantity__c;
    }

    get totalPriceGet() {
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

    handleQuantity(event) {
        this.quantityUpd=event.target.value;

        /*this.quantityUpd = event.target.value;
        const quantityEvent = new CustomEvent(
            'quantity', {detail: {
                quantity: this.quantityUpd
            }       
        });                             
        this.dispatchEvent(quantityEvent);*/
    }

    handleCheckbox(event) {
        this.checkboxVal=event.target.checked;


        if(this.checkboxVal===false){
            this.quantityUpd=0;
            this.readOnly = true;
            alert(DELETE_TEXT); 
            this.quantityClass= READ_CLASS;

        } if(this.checkboxVal===true){
            this.quantityUpd=1;
            this.readOnly = false;
            this.quantityClass= READ_ONLY_CLASS;

            /*const checkedEvent = new CustomEvent('checked', {detail: this.totalPrice});

            console.log('totalPrice:' +this.totalPrice);

            this.dispatchEvent(checkedEvent);*/ 
         }

       // const checkedEvent = new CustomEvent('checked', {});
       // this.dispatchEvent(checkedEvent);
    }

    /*renderedCallback() {

        this.checkboxVal=this.basketId.ProductStatus__c;
        this.quantityUpd=this.basketId.Quantity__c;

        this.phonePrice=this.basketId.UnitPrice__c;
        this.totalPrice=this.quantityUpd*this.phonePrice;
        //this.totalPrice=this.basketId.TotalPrice__c;
        
        console.log('checkboxVal:' +this.checkboxVal);
        console.log('quantityUpd:' +this.quantityUpd);
    }
*/


   /* handleCheckbox(event) {
        this.checkboxVal=event.target.checked;

        if(this.checkboxVal===false){
            this.quantity=0;
            this.readOnly = true;
            alert(DELETE_TEXT); 
            this.quantityClass= READ_CLASS;

        } if(this.checkboxVal===true){
            this.quantity=1;
            this.readOnly = false;
            this.quantityClass= READ_ONLY_CLASS;

            /*const checkedEvent = new CustomEvent('checked', {detail: this.totalPrice});

            console.log('totalPrice:' +this.totalPrice);

            this.dispatchEvent(checkedEvent);   // 
         }

       // const checkedEvent = new CustomEvent('checked', {});
       // this.dispatchEvent(checkedEvent);
    }*/

    /*handleQuantity(event) {
        this.quantity=event.target.value;
        this.phonePrice=this.product.Price__c;
        this.totalPrice=this.quantity*this.phonePrice;
            console.log('phonePrice:' +this.phonePrice);
            console.log('totalPrice:' +this.totalPrice);
        this.fireEvent();
    }*/

    //let fullPrice = (this.price, this.quantity) => this.price*this.quantity;

    /*get price() {
        this.phonePrice=this.product.Price__c;
        return this.phonePrice;
    }*/

    /*get quantityItems() {
        return this.quantity;
    }
    set quantityItems(value) {
        this.quantity=value;
    }*/

    /*get totalPriceItem() {
        var phone=this.product.Price__c;
        return this.quantity*phone;
        /*
        this.phonePrice=this.product.Price__c;
        this.totalPrice=this.quantity*this.phonePrice;
        console.log('phonePrice:' +this.phonePrice);
        console.log('totalPrice:' +this.totalPrice);
        return this.totalPrice;    //
    }*/

    /*renderedCallback() {
       const price = this.template.querySelector(
            'lightning-formatted-number'
        );
        //var price = document.getElementById("totalPriceItem").value;
   // this.totalPrice = price;
   // console.log('totalPrice getElementById:' +this.totalPrice);
    console.log('getElementById:' +price);
    console.log('getElementById:' +this.price);

        this.phonePrice=this.product.Price__c;
        this.totalPrice=this.quantity*this.phonePrice;
        const priceEvent = new CustomEvent('price', {detail: this.totalPrice});
        console.log('phonePrice:' +this.phonePrice);
        console.log('totalPrice:' +this.totalPrice);

        this.dispatchEvent(priceEvent); 
    }*/

    /*set totalPriceItem(value) {
        this.totalPrice = value.totalPriceItem();
    }*/

    /*renderedCallback() {
        if (this.hasRendered===true) {
            this.phonePrice=this.product.Price__c;
            this.totalPrice=this.quantity*this.phonePrice;
            console.log('phonePrice:' +this.phonePrice);
            console.log('totalPrice:' +this.totalPrice);
    
            /*const priceEvent = new CustomEvent('price', {detail: {
                fullPrice: this.totalPrice
                }       
            });                             
            this.dispatchEvent(priceEvent); //
            this.fireEvent();
            this.hasRendered = false;
        }
    }
*/

   /* fireEvent() {
        const priceEvent = new CustomEvent('price', {detail: {
            fullPrice: this.totalPrice
            }       
        });                             
        this.dispatchEvent(priceEvent);
    }*/
}