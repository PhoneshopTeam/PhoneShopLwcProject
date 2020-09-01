import { LightningElement, wire, api, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import LOGO_FIELD from '@salesforce/schema/Account.Logo__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
const fields = [NAME_FIELD, LOGO_FIELD, DESCRIPTION_FIELD];

export default class Company extends LightningElement {
    @api recordId;
    @track account;

    @wire(getRecord, { recordId: '$recordId', fields })
    account;

   /* get name() {
        return this.account.data.fields.Name.value;
    }*/
    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
        //return this.account.data.fields.Name.value;
    }
    get logo() {
        return getFieldValue(this.account.data, LOGO_FIELD);
        //return this.account.data.fields.Name.value;
    }

    get description() {
        return getFieldValue(this.account.data, DESCRIPTION_FIELD);
        //return this.account.data.fields.Description.value;
    }
    

 /*   @wire(getAccount, { recordId: '$accId' })
    wiredAccount({error, data}){
        if(data){
            this.account = data;
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading account',
                    message: error.message,
                    variant: 'error',
                }),
            );
        }
    }*/
}