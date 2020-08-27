import {
    LightningElement,
    wire
} from 'lwc';
import getMobilesInOrder from "@salesforce/apex/MobileDataService.getMobilesInOrder";
import getDeliveryAdress from "@salesforce/apex/ContactController.getDeliveryAdress";
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    updateRecord
} from 'lightning/uiRecordApi';
import {
    refreshApex
} from '@salesforce/apex';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ORDER_NUMBER_FIELD from '@salesforce/schema/Custom_Order__c.Order_Number__c';
import TOTAL_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';

const COLS = [{
        label: "Picture",
        fieldName: "Picture__c",
        hideDefaultActions: true, type: 'image'
    },
    {
        label: "Name",
        fieldName: "Name",
        hideDefaultActions: true
    },
    {
        label: "Price",
        fieldName: "Price__c",
        hideDefaultActions: true, type: 'currency'
    }
];

export default class Order extends LightningElement {

    //@api
    contactId = "0032w00000FyKrCAAV";
    //@api
    orderId = "a002w000009iUOQAA2";
    selectedAddress;

    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];
    fieldsOfOrder = [ORDER_NUMBER_FIELD, TOTAL_AMOUNT_FIELD];

    columns = COLS;

    @wire(getMobilesInOrder, {
        orderId: "$orderId"
    }) mobiles;

    @wire(getDeliveryAdress, {
        contactId: "$contactId"
    }) deliveryAddresses;

     refresh() {
         return refreshApex(this.deliveryAddresses);
     }

    get deliveryAddressesOptions() {
        const returnOptions = [];
        if (this.deliveryAddresses.data) {
            console.log('this.deliveryAddresses.data = ' + JSON.stringify(this.deliveryAddresses.data));
            const addresses = this.deliveryAddresses.data;
            console.log(' const addresses = ' + addresses);
            addresses.forEach(item => {
                console.log(' item.Name = ' + item.Adress__c);
                returnOptions.push({
                    label: item.Adress__c,
                    value: item.Id
                });
            });
        }
        return returnOptions;
    }

    handleChange(event) {
        console.log('handleChange');

        this.selectedAddress = event.detail.value;
    }

    handleSubmit(event) {
        const recordInputs = event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return {
                fields
            };
        });
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));

        Promise.all(promises).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Address updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];

            return refreshApex(this.addresses);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleSubmitForOrder(event) {
        const recordInputs = event.detail.draftValues.slice().map(draft => {
            const fieldsOfOrder = Object.assign({}, draft);
            return {
                fieldsOfOrder
            };
        });
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));

        Promise.all(promises).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Order updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];

            return refreshApex(this.addresses);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}