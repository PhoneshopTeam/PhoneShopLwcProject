import { LightningElement } from 'lwc';
import Contact_OBJECT from '@salesforce/schema/Contact';
import F_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import L_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import LOGIN_FIELD from '@salesforce/schema/Contact.Login__c';
import PASSWORD_FIELD from '@salesforce/schema/Contact.Password__c';
import ADDRESS_FIELD from '@salesforce/schema/Contact.MailingAddress';

export default class CreateContact extends LightningElement {
    contactObject = Contact_OBJECT;
    myFields = [F_NAME_FIELD, L_NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ADDRESS_FIELD, LOGIN_FIELD, PASSWORD_FIELD];

    handleAccountCreated(){
        // Run code when account is created.
    }
}