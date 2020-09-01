import { LightningElement } from 'lwc';
import saveContact from '@salesforce/apex/RegistrContactController.saveContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import Contact_OBJECT from '@salesforce/schema/Contact';
import F_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import L_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import LOGIN_FIELD from '@salesforce/schema/Contact.Login__c';
import PASSWORD_FIELD from '@salesforce/schema/Contact.Password__c';
import STREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import CITY_FIELD from '@salesforce/schema/Contact.MailingCity';

export default class RegistrationPage extends NavigationMixin(LightningElement)  {
    firstNameValue;
    lastNameValue;
    emailValue;
    phoneValue;
    loginValue;
    passwordValue;
    checkBoxFieldValue=false;
    streetValue;
    cityValue;
    
    info;

    handleChange(event) {
        if(event.target.name === 'FirstName') {
            this.firstNameValue = event.target.value;
        }
        if(event.target.name === 'LastName') {
            this.lastNameValue = event.target.value;
        }
        if(event.target.name === 'Phone') {
            this.phoneValue = event.target.value;
        }
        if(event.target.name === 'Email') {
            this.emailValue = event.target.value;
        }
        if(event.target.name === 'Login') {
            this.loginValue = event.target.value;
        }
        if(event.target.name === 'Password') {
            this.passwordValue = event.target.value;
        }
        if(event.target.name === 'Street') {
            this.streetValue = event.target.value;
        }
        if(event.target.name === 'City') {
            this.cityValue = event.target.value;
        }
    }

    handleCheckBoxChange(event){
        this.checkBoxFieldValue = event.target.checked;
     }

    createRecord() {

       let registerContact = { [F_NAME_FIELD.fieldApiName] : this.firstNameValue ,
            [L_NAME_FIELD.fieldApiName] : this.lastNameValue,
            [EMAIL_FIELD.fieldApiName] : this.emailValue,
            [PHONE_FIELD.fieldApiName] : this.phoneValue,
            [STREET_FIELD.fieldApiName] : this.streetValue,
            [CITY_FIELD.fieldApiName] : this.cityValue,
            [LOGIN_FIELD.fieldApiName] : this.loginValue,
            [PASSWORD_FIELD.fieldApiName] : this.passwordValue };

            /* const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput) */

        if(this.checkBoxFieldValue == false) {
            alert('Please check "I`m not a robot"');
            return false;
        }
    
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
    }

    /*handleLoginClick() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            },
        });
    }*/

    handleLoginClick() {
        // Navigate to the About company page
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__navigation"
            },
        });
    }
}