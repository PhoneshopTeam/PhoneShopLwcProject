<<<<<<< HEAD
import { LightningElement, wire, api, track } from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WORKING_HOURS_FIELD from '@salesforce/schema/Account.Working_hours__c';
import EMAIL_FIELD from '@salesforce/schema/Account.Email__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
import LOGO_FIELD from '@salesforce/schema/Account.Logo__c';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ADRESS_FIELD from '@salesforce/schema/Account.BillingAddress';
import { NavigationMixin } from 'lightning/navigation';
=======
import { LightningElement } from "lwc";
>>>>>>> 2cd56f6a89de5e7b92fdbda42ba1b2c0a0a8af93

const fields = [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ADRESS_FIELD, WORKING_HOURS_FIELD];
export default class AboutCompany extends NavigationMixin(LightningElement) {

    //recordId;
    //accId = '0012w00000K2JXVAA3';
    //@track account;

   @wire(getAccount)
    account;

    /*@wire(getRecord, { recordId: '$recordId', fields })
    account;*/

    /*@wire(getAccount, { recordId: '$recordId' })
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

   /*get name() {
        //return getFieldValue(this.account.data, NAME_FIELD);
        return this.account.fields.Name.value;
    }*/
   /*  get website() {
        return getFieldValue(this.account.data, WEBSITE_FIELD);
        //return this.account.data.fields.Website.value;
    }
    get description() {
        //return getFieldValue(this.account.data, DESCRIPTION_FIELD);
        return this.account.data.fields.Description.value;
    }
    get logo() {
        return getFieldValue(this.account.data, LOGO_FIELD);
        //return this.account.data.fields.Logo__c.value;
    }*/
 /*   get adress() {
        return getFieldValue(this.account.data, ADRESS_FIELD);
        //return this.account.data.fields.BillingAddress.value;
    }*/
    get phone() {
        //return getFieldValue(this.account.data, PHONE_FIELD);
        return this.account.data.fields.Phone;
    }

    handleLoginClick() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: "standard__component",
                attributes: {
                    componentName: "c__RegistrationPage"
                },
        });
    }
    

    
}