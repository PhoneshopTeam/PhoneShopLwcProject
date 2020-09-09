import {
    LightningElement,
    wire,
    api,
    track
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

import getAccount from '@salesforce/apex/AccountController.getAccount';

//import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WORKING_HOURS_FIELD from '@salesforce/schema/Account.Working_hours__c';
import EMAIL_FIELD from '@salesforce/schema/Account.Email__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
import LOGO_FIELD from '@salesforce/schema/Account.Logo__c';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ADDRESS_FIELD from '@salesforce/schema/Account.BillingAddress';

const ACC_FIELDS = [NAME_FIELD, LOGO_FIELD, DESCRIPTION_FIELD,
    WORKING_HOURS_FIELD, EMAIL_FIELD, PHONE_FIELD, ADDRESS_FIELD
];
export default class AboutCompany extends NavigationMixin(LightningElement) {

    //@api
    recordId = '0012w00000LD5UPAA1'; //0012w00000K2JaZAAV

    @wire(getAccount, {
        recordId: '$recordId'
    })
    account;

    get name() {
        return this.account.data.Name;
    }

    get description() {
        return this.account.data.Description;
    }

    get logo() {
        return this.account.data.Logo__c;
    }

    get phone() {
        return this.account.data.Phone;
    }

    get email() {
        return this.account.data.Email__c;
    }

    get hours() {
        return this.account.data.Working_hours__c;
    }

    get addressCity() {
        return this.account.data.BillingCity;
    }

    get addressStreet() {
        return this.account.data.BillingStreet;
    }
}