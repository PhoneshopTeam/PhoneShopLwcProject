import {
    LightningElement,
    wire
} from 'lwc';
import getMobilesInOrder from "@salesforce/apex/MobileDataService.getMobilesInOrder";
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    updateRecord
} from 'lightning/uiRecordApi';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const COLS = [{
        label: "Picture__c",
        fieldName: "Picture__c",
        hideDefaultActions: true
    },
    {
        label: "Name",
        fieldName: "Name",
        hideDefaultActions: true
    },
    {
        label: "Price__c",
        fieldName: "Price__c",
        hideDefaultActions: true
    }
];

export default class Order extends LightningElement {

    //@api
    contactId = "0032w00000FyKrCAAV";
    //@api
    orderId = "a002w000009iUOQAA2";

    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];

    columns = COLS;

    @wire(getMobilesInOrder, {
        orderId: "$orderId"
    }) mobiles;

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
}