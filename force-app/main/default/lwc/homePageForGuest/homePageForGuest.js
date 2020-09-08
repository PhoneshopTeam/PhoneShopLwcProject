import { LightningElement } from 'lwc';
import {CurrentPageReference, NavigationMixin} from 'lightning/navigation';
export default class HomePageForGuest extends  NavigationMixin(LightningElement) {
    navigateToCatalog(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: ''
            }
        },
        true
    );
}

    navigateToAbout(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                 url: ''
            }
        },
        true
    );
}

    navigateToBascet(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: ''
            }
        },
        true
    );
}

    navigateToRegistration(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: ''
            }
        },
        true
    );
}
navigateToLogin() {
    this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://lwcphoneshop-dev-ed.lightning.force.com/lightning/n/Autorization_Page'
            }
        },
        true
    );
}

}