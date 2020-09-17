import {
    LightningElement
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

const LOGIN_TAB = 'authorization';

export default class SignInComponent extends NavigationMixin(LightningElement) {

    isModalOpen = false;


    renderedCallback() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;

        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__ToHomePageWithoutAuthorization"
            }
        })
    }

    handleLoginClick() {
        this.template.querySelector('lightning-tabset').activeTabValue = LOGIN_TAB;
    }

}