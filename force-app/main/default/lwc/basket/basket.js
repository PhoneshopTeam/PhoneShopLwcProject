import {
  LightningElement,
  wire,
  track
} from 'lwc';
import {
  NavigationMixin
} from 'lightning/navigation';
import {
  getRecord,
  getFieldValue,
  createRecord
} from 'lightning/uiRecordApi';
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';
import saveOrder from '@salesforce/apex/BasketController.saveOrder';
import getBasketList from '@salesforce/apex/BasketController.getBasketList';

import ORDER_OBJECT from '@salesforce/schema/Custom_Order__c';
import ORDER_NAME_FIELD from '@salesforce/schema/Custom_Order__c.Name';
import ORDER_CONTACTID_FIELD from '@salesforce/schema/Custom_Order__c.ContactId__c';
import ORDER_STATUS_FIELD from '@salesforce/schema/Custom_Order__c.Status__c';
//import ORDER_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';

const DELETE_TEXT = "You have removed this item from your basket"
const READ_CLASS = "lgc-bg-inverse";
const READ_ONLY_CLASS = "lgc-bg";

export default class Basket extends NavigationMixin(LightningElement) {

  //@api
  contactId = '0032w00000FyKrCAAV';
  orderId = 'a002w000009k7TYAAY'; // = 'a012w00000NmDdVAAV';   //Name = 'DraftOrder'

  baskets;

  //@track hasRendered = true;
  quantity;
  totalPrice;
  checkboxVal = true;

  info;

  /*@wire(getProductList)
	wiredProducts(result) {
		this.products = result;
    }*/

  @wire(getBasketList, {
    contactId: '$contactId'
  })
  wiredBaskets({
    error,
    data
  }) {
    if (data) {
      this.error = undefined;
      this.baskets = data;
      //this.quantity=this.basketItem.Quantity__c;

    } else if (error) {
      this.error = error;
    }
  }

  handleOrderButton() {

    const fields = {};
    fields[ORDER_NAME_FIELD.fieldApiName] = 'Order ' + this.contactId;
    //fields[ORDER_CONTACTID_FIELD.fieldApiName] = this.contactId;
    fields[ORDER_STATUS_FIELD.fieldApiName] = 'Draft';
    //fields[ORDER_AMOUNT_FIELD.fieldApiName] = this.quantity * this.mobilePrice;

    const recordInput = {
      apiName: ORDER_OBJECT.objectApiName,
      fields
    }
    createRecord(recordInput)
      .then(order => {
        this.orderId = order.id;
        console.log("aaaaaaaaaa");

        saveOrder({
            contactId: this.contactId,
            orderId: this.orderId
          })

          .then(result => {
            this.info = result;
            console.log("bbbbbbbb");
            this.dispatchEvent(
              new ShowToastEvent({
                title: 'Success',
                message: 'Successful ORDER ORDER ORDER',
                variant: 'success',
              }),
            );

            this[NavigationMixin.Navigate]({
              type: "standard__component",
              attributes: {
                componentName: "c__FromBasketToOrder"
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
            this.dispatchEvent(
              new ShowToastEvent({
                title: 'Error Basket save',
                message: error.body.message,
                variant: 'error',
              }),
            );
          });
      })
      .catch(error => {
        window.console.log(error);
        this.error = JSON.stringify(error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error Order save',
            message: error.body.message,
            variant: 'error',
          }),
        );
      });
  }

  /*handleOrderButton() {
    saveContact({newContact: registerContact})
        .then(result => {
            this.info = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successful registration',
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
  }*/
}