/* eslint-disable radix */
import {
    LightningElement,
    api
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';

export default class CongratulationPage extends NavigationMixin(LightningElement) {

    @api userId;
    @api userName;

    renderedCallback() {}

    handleNavigation(event) {

        switch (event.target.dataset.id) {
            case "gallery":
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__FromOrderToGallery"
                    },
                    state: {
                        c__userId: this.userId,
                        c__userName: this.userName

                    }
                })
                break;
            case "office":
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__FromOrderToPersonalOffice"
                    },
                    state: {
                        c__userId: this.userId,
                        c__userName: this.userName

                    }
                })
                break;
            default:
        }
    }
}