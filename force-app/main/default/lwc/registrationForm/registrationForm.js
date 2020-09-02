import { LightningElement, track } from 'lwc';
import saveUser from '@salesforce/apex/RegistrationController.saveUser';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import USER_OBJECT from '@salesforce/schema/User';
import NAME_FIELD from '@salesforce/schema/User.LastName';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import LOGIN_FIELD from '@salesforce/schema/User.Username';
import FIRST_NAME_FIELD from '@salesforce/schema/User.First_Name__c';
import PHONE_FIELD from '@salesforce/schema/User.MobilePhone';
import PASSWORD_FIELD from '@salesforce/schema/User.Password__c';

export default class RegistrationForm extends LightningElement {
    firstName;
    lastName;
    login;
    password;
    email;
    phone;
    user;
    fName;
    lName;
    mail;

    /*salutationsList = [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Ms.', value: 'Ms.' },
        { label: 'Mrs.', value: 'Mrs.' },
    ];

    fieldsList = ['firstName', 'lastName', 'salutation'];
*/
    @track registerUser = {
        NAME_FIELD : this.lastName,
        FIRST_NAME_FIELD : this.firstName,
        EMAIL_FIELD : this.email,
        PHONE_FIELD : this.phone,
        LOGIN_FIELD : this.login,
        PASSWORD_FIELD : this.password
    };

    @track registerUser1 = {
        NAME_FIELD : 'lastName',
        FIRST_NAME_FIELD : 'firstName',
        EMAIL_FIELD : 'email',
        PHONE_FIELD : 'phone',
        LOGIN_FIELD : 'login',
        PASSWORD_FIELD : 'password'

    };

    get salutationOptions() {
        return this.salutationsList;
    }

    get fields() {
        return this.fieldsList;
    }

    handleChange(event) {
        if(event.target.name === 'FirstName') {
            this.firstName = event.target.value;
        }
        if(event.target.name === 'LastName') {
            this.lastName = event.target.value;
        }
        if(event.target.name === 'Email') {
            this.email = event.target.value;
        }
        if(event.target.name === 'Phone') {
            this.phone = event.target.value;
        }
        if(event.target.name === 'Login') {
            this.login = event.target.value;
        }
        if(event.target.name === 'Password') {
            this.password = event.target.value;
        }
    }

    handleLoginClick(event) {
        this.clickedButtonLabel = event.target.label;
    }

    createUser() {
        saveUser({fName: this.firstName, lName: this.lastName, mail: this.email})
            .then(result => {
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
                        title: 'Error creating user',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    /*createUser( ){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then((account) => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
    }*/
}