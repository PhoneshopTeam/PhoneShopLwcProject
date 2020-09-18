import {
    LightningElement
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

export default class SignInComponent extends NavigationMixin(LightningElement) {

    isModalOpen = false;
    isShowForgotPassword = false;


    renderedCallback() {
        this.isModalOpen = true;
    }

    showForotPassword() {
        this.isShowForgotPassword = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.isShowForgotPassword = false;
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__FromRegistrationToHome"
            }
        })
    }

}