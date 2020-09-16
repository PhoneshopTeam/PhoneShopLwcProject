import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getProductList from '@salesforce/apex/BasketController.getProductList';
//import getProductIds from '@salesforce/apex/BasketController.getProductIds';
import saveOrder from '@salesforce/apex/BasketController.saveOrder';
import getBasketList from '@salesforce/apex/BasketController.getBasketList';

import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import ID_FIELD from '@salesforce/schema/Contact.Id';

import ORDER_OBJECT from '@salesforce/schema/Custom_Order__c';
import ORDER_NAME_FIELD from '@salesforce/schema/Custom_Order__c.Name';
import ORDER_CONTACTID_FIELD from '@salesforce/schema/Custom_Order__c.ContactId__c';
import ORDER_STATUS_FIELD from '@salesforce/schema/Custom_Order__c.Status__c';
import ORDER_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';

const DELETE_TEXT = "You have removed this item from your basket"
const READ_CLASS  = "lgc-bg-inverse";
const READ_ONLY_CLASS = "lgc-bg";
const CONTACT_FIELDS = [NAME_FIELD, FIRST_NAME_FIELD, LAST_NAME_FIELD];
const ID_FIELDS = [ID_FIELD];

export default class Basket extends NavigationMixin(LightningElement) {

    //@api
    contactId = '0032w00000INmlwAAD';
    draftOrderId = 'a012w00000NmDdVAAV';   //Name = 'DraftOrder'

    baskets;

    @track hasRendered = true;
    quantity;
    totalPrice;
    checkboxVal = true;

    products;
    handleCheckbox;
    totalAmount;
    inputValue=1;
    userId = Id;
    userName;
    contacts;
 
    info;
    

    /*@wire(getProductList)
	wiredProducts(result) {
		this.products = result;
    }*/

   /* @wire(getProductList, {contactId : '$contactId'})
	  wiredProducts({ error, data }) {
      if (data) {
          this.error = undefined;
          this.products = data;
      } else if (error) {
        this.error = error;
      }
    }*/

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

    @wire(getBasketList, {contactId : this.contactId})
    wiredBaskets({ error, data }) {
        if (data) {
            this.error = undefined;
            this.baskets = data;
            //this.quantity=this.basketItem.Quantity__c;
            
        } else if (error) {
          this.error = error;
        }
    }

    handlequantityEvent(event) {

    }
  }

    /*handleOrderButton() {

      const fields = {};
      fields[ORDER_NAME_FIELD.fieldApiName] = 'Order ' + this.contactId;
      fields[ORDER_CONTACTID_FIELD.fieldApiName] = this.contactId;
      fields[ORDER_STATUS_FIELD.fieldApiName] = 'Draft';
      //fields[ORDER_AMOUNT_FIELD.fieldApiName] = this.quantity * this.mobilePrice;

      const recordInput = {
        apiName: ORDER_OBJECT.objectApiName,
        fields
      }
      createRecord(recordInput)
        .then(order => {
          this.orderId = order.id;

          saveOrder({contactId : this.contactId, draftOrderId : this.draftOrderId, orderId : this.orderId})
            .then(result => {
              this.info = result;
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Success',
                      message: 'Successful ORDER ORDER ORDER',
                      variant: 'success',
                  }),
              );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating contact',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
          }) 
          .catch(error => {
            window.console.log(error);
            this.error = JSON.stringify(error);
          });
      }*/



      /*
      const fields = {};
      fields[ORDER_NAME_FIELD.fieldApiName] = 'Order ' + this.contactId;
      fields[ORDER_CONTACTID_FIELD.fieldApiName] = this.contactId;
      fields[ORDER_STATUS_FIELD.fieldApiName] = 'Draft';
      //fields[ORDER_AMOUNT_FIELD.fieldApiName] = this.quantity * this.mobilePrice;

      const recordInput = {
        apiName: ORDER_OBJECT.objectApiName,
        fields
      }
      createRecord(recordInput)
        .then(order => {
 
          this.orderId = order.id;
          const fields = {};
          fields[BASKET_PRODUCTID_FIELD.fieldApiName] = this.productId;
          fields[BASKET_CONTACTID_FIELD.fieldApiName] = this.contactId;
          fields[BASKET_ORDERID_FIELD.fieldApiName] = this.orderId
          fields[BASKET_STATUS_FIELD.fieldApiName] = true;
          fields[BASKET_QUANTITY_FIELD.fieldApiName] = this.quantity;
          fields[BASKET_UNITPRICE_FIELD.fieldApiName] = this.mobilePrice;
          //fields[BASKET_TOTALPRICE_FIELD.fieldApiName] = this.quantity * this.mobilePrice;
          const recordInput = {
            apiName: BASKET_OBJECT.objectApiName,
            fields
          }
          window.console.log('a');
          createRecord(recordInput)
            .then(basket => {
              window.console.log('b');
              window.console.log(basket.id);
              this.dispatchEvent(new ShowToastEvent({
                title: 'Success!',
                message: 'Order ' + this.orderId + ' Created Successfully!',
                variant: 'success'
              }));
              this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                  componentName: "c__FromMobileDetailsToNewOrder"
                },
                state: {
                  c__orderId: this.orderId,
                  c__contactId: this.contactId
                }
              })
            })
            .catch(error => {
              window.console.log(error);
              this.error = JSON.stringify(error);
            });
        })
        .catch(error => {
          window.console.log(error);
          this.error = JSON.stringify(error);
        });
    }*/

    /*@wire(getContactName, {recordId : '$userId' })
	wiredContacts(result) {
        this.contactId = result;
        this.cntId = contactId.fields.Id.value;
        console.log('contactId://///' +this.contactId);
        console.log('result://///' +result);
    }*/

    /*@wire(getContactName, {recordId : '$userId' })
    contact;*/

    /*@wire(getRecord, { recordId: '$contactId', CONTACT_FIELDS })
    contact;*/

  /* @wire(getContactName, { recordId: '$userId', fields : ID_FIELDS })
  wiredRecord({ error, data }) {
    // Error handling
    if (data) {
      this.error = undefined;
      const cntId = data.fields.Id.value;
      this.contactId = cntId;
      //this.updateMap(longitude, latitude);
    } else if (error) {
      this.error = error;
    }
  }


    
    get cntName() {
		return getFieldValue(this.contact.data, NAME_FIELD);
    }
    get firstName() {
		return getFieldValue(this.contact.data, FIRST_NAME_FIELD);
    }
    get lastName() {
        //return this.contacts.data.fields.LastName;
		return getFieldValue(this.contact.data, LAST_NAME_FIELD);
    }
    
    handlePrice(event) {
       let i;
        let amount=this.template.querySelectorAll('c-item-basket');
        for(i=0; i<amount.length; i++) {
            amount[i].totalAmount = event.detail;
        }    //
        this.totalAmount = event.detail.fullPrice;

        console.log("totalAmount: "+this.totalAmount);
    }

    handleQuantity(event) {
        this.inputValue=event.target.value;
        console.log("handleQuantity: "+this.inputValue);

    }*/
