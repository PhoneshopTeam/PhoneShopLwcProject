import { LightningElement, api, wire, track } from 'lwc';
const DELETE_TEXT = "You have removed this item from your basket"
const READ_CLASS  = "lgc-bg-inverse";
const READ_ONLY_CLASS = "lgc-bg";

export default class ItemBasket extends LightningElement {
    productId;
    quantity=1;
    totalPrice='';
    checkboxVal = true;
    readOnly = false;
    productIds;
    phonePrice;
    quantityClass;
    @api product;
    @track hasRendered = true;

    

    handleCheckbox(event) {
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

            this.dispatchEvent(checkedEvent);*/ 
         }

       // const checkedEvent = new CustomEvent('checked', {});
       // this.dispatchEvent(checkedEvent);
    }

    handleQuantity(event) {
        this.quantity=event.target.value;
        this.phonePrice=this.product.Price__c;
        this.totalPrice=this.quantity*this.phonePrice;
            console.log('phonePrice:' +this.phonePrice);
            console.log('totalPrice:' +this.totalPrice);
        renderedCallback();
        this.fireEvent();
    }

    //let fullPrice = (this.price, this.quantity) => this.price*this.quantity;

    /*get price() {
        this.phonePrice=this.product.Price__c;
        return this.phonePrice;
    }*/

    @api
    get quantityItems() {
        return this.quantity;
    }
    set quantityItems(value) {
        this.quantity=value;
    }

    @api
    get totalPriceItem() {
        var phone=this.product.Price__c;
        return this.quantity*phone;
        /*
        this.phonePrice=this.product.Price__c;
        this.totalPrice=this.quantity*this.phonePrice;
        console.log('phonePrice:' +this.phonePrice);
        console.log('totalPrice:' +this.totalPrice);
        return this.totalPrice;*/
    }

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

    renderedCallback() {
        if (this.hasRendered===true) {
            this.phonePrice=this.product.Price__c;
            this.totalPrice=this.quantity*this.phonePrice;
            console.log('phonePrice:' +this.phonePrice);
            console.log('totalPrice:' +this.totalPrice);
    
            /*const priceEvent = new CustomEvent('price', {detail: {
                fullPrice: this.totalPrice
                }       
            });                             
            this.dispatchEvent(priceEvent); */
            this.fireEvent();
            this.hasRendered = false;
        }
    }


    fireEvent() {
        const priceEvent = new CustomEvent('price', {detail: {
            fullPrice: this.totalPrice
            }       
        });                             
        this.dispatchEvent(priceEvent);
    }

   /*@wire(getProductId)
    wiredProduct({ error, data }) { 
        if (data) {
            this.product = data;
            //this.productIds=data.Id;
            //this.price=data.Price__c;
        } else if (error) {
            this.error = error;
        }
    }*/

    /*@wire(getProductId)
    product;*/


}