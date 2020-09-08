import {
    LightningElement,
    track,
    wire,
    api
} from 'lwc';
import {
    CurrentPageReference,
    NavigationMixin
} from 'lightning/navigation';
import getContact from '@salesforce/apex/HomePageController.getContact';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    loadScript,
    loadStyle
} from 'lightning/platformResourceLoader';
import PAYPAL_SCR from '@salesforce/resourceUrl/paypal';


export default class HomePage extends NavigationMixin(LightningElement) {
    @api contactId;
    @track userName;
    @track open = false;
    @api objectApiName;
    @track hasRendered = true;
    @wire(CurrentPageReference) currentPageReference;


    get userNameFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__userName
        );
    }
    get userIdFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__userId
        );
    }

    renderedCallback() {
        this.userName = this.userNameFromState;
        //     Promise.all([
        //         loadScript(this, PAYPAL_SCR + '/paypal.js')
        //       ])
        //       .then(() => {
        //         console.log('load')
        //         this.initPaypal()})
        //       .catch(error => {
        //         console.error('loadScript error', error);
        //         this.error = 'Error loading PAYPAL_SCR';
        //       });
        // }
        // initPaypal(){
        // paypal.Buttons().render('#paypal-button-container');
    }

    openShat() {
        this.open = true;
        getContact({
                searchUserName: this.userName
            })
            .then((result) => {
                this.contactId = result.Id;
                console.log('id', this.contactId)
            })
    }

    closeChat() {
        this.open = false
    }

    sendMessage() {
        addMessageInDatabase({
            inputMessage: this.inputTextMessage
        });
    }

    handleChange(event) {
        if (event.target.label === 'Enter message') {
            this.inputTextMessage = event.target.value;
        }
    }

    navigateToCatalog() {
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: ''
                }
            },
            true
        );
    }

    navigateToAbout() {
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: ''
                }
            },
            true
        );
    }

    navigateToBascet() {
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: ''
                }
            },
            true
        );
    }

    navigateToPersonalOffice() {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__FromHomePageToPersonalOffice"
            },
            state: {
                c__userName: this.userName,
                c__userId: this.contactId

            }
        })
    }

    logout() {
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: 'https://lwcphoneshop-dev-ed.lightning.force.com/lightning/n/Home_Page_For_Guest'
                }
            },
            true
        );
    }
}