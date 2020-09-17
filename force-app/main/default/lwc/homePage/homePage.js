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

export default class HomePage extends NavigationMixin(LightningElement) {
    // @api
    contactId;
    @track userName;
    @track userId;
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
        this.userId = this.userIdFromState;
        console.log(this.userName)
        console.log(this.userId)
    }
    //    );
    // }
    // initPaypal(){
    // paypal.Buttons().render('#paypal-button-container');
    // };

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
}