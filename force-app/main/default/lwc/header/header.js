import {
    LightningElement,
    api,
    track,
    wire
} from 'lwc';

import {
    NavigationMixin
} from 'lightning/navigation';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

// Import message service features required for subscribing and the message channel
import { subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext } from 'lightning/messageService';

import USER_NAME_CHANNEL from '@salesforce/messageChannel/UserName__c';

export default class Header extends NavigationMixin(LightningElement) {
    @api userId;
    @api userName;
    authLabel;
    recordName;
    subscription = null;

    renderedCallback() {
        console.log('renderedCallback header');
        console.log('this.userId  = ' + this.userId);
 
        this.authLabel = this.userId ? "Sign out" : "Sign in"

        /*  
        const promises = this.userId;  
        Promise.all(this.userId)
        .then(
            this.authLabel = this.userId ? "Sign out" : "Sign in"
        ).catch(error => {
            console.log('***********error************ ' +error);
            //
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });*/
        console.log('this.authLabel = ' + this.authLabel);
    }

    navigateToHome() {
        if (this.userId) {
            console.log('navigateToHome header');
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromRegistrationToHome"
                },
                state: {
                    c__userName: this.userName,
                    c__userId: this.userId
                }
            })
        } else {

            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToHomePageWithoutAuthorization"
                }
            })
        }
    }

    navigateToCatalog() {
        console.log('navigateToCatalog header');
        if (this.userId) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromHomePageToGallery"
                },
                state: {
                    c__userName: this.userName,
                    c__userId: this.userId
                }
            })
        } else {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToGalleryWithoutAuthorization"
                }
            })
        }

    }

    navigateToAbout() {
        console.log('navigateToAbout header');
        if (this.userId) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromHomePageToAboutCompany"
                },
                state: {
                    c__userName: this.userName,
                    c__userId: this.userId
                }
            })
        } else {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToAboutCompanyWithoutAuthorization"
                }
            })
        }

    }

    navigateToBascet() {
        console.log('navigateToBascet header');
        if (this.userId) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromHomePageToBasket"
                },
                state: {
                    c__userName: this.userName,
                    c__userId: this.userId
                }
            })
        }
    }

    navigateToPersonalOffice() {
        if (this.userId) {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromHomePageToPersonalOffice"
                },
                state: {
                    // c__userName: this.userName,
                    c__userId: this.userId
                }
            })
        }
    }

    navigateToLogin() {
        if (this.userId) {

            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToHomePageWithoutAuthorization"
                }
            })
        } else {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToSignInComponent"
                }
            })
        }
    }

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    /*subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            USER_NAME_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }*/

    // Pass scope to the subscribe() method.
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                USER_NAME_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordName = message.recordName;
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}