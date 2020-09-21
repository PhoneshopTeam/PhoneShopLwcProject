import {
    LightningElement
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

const LOGIN_TAB = 'authorization';

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

    handleLoginClick() {
        this.template.querySelector('lightning-tabset').activeTabValue = LOGIN_TAB;
    }

}