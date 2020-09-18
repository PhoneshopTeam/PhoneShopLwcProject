import {
    LightningElement,
    api
} from 'lwc';

import {
    NavigationMixin
} from 'lightning/navigation';

export default class Header extends NavigationMixin(LightningElement) {
    @api userId;
    @api userName;
    authLabel;

    renderedCallback() {
        console.log('renderedCallback header');
        console.log('this.userId  = ' + this.userId);

        this.authLabel = this.userId ? "Sign out" : "Sign in"

        console.log('this.authLabel = ' + this.authLabel);
    }

    navigateToHome() {
        console.log('navigateToHome header');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__FromRegistrationToHome"
            },
            state: {
                c__userId: this.userId,
                c__userName: this.userName
            }
        })
    }

    navigateToCatalog() {
        console.log('navigateToCatalog header');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__FromHomePageToGallery"
            },
            state: {
                c__userId: this.userId,
                c__userName: this.userName
            }
        })
    }

    navigateToAbout() {
        console.log('navigateToAbout header');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__FromHomePageToAboutCompany"
            },
            state: {
                c__userId: this.userId,
                c__userName: this.userName
            }
        })
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
                    c__userId: this.userId,
                    c__userName: this.userName
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
                    c__userId: this.userId,
                    c__userName: this.userName
                }
            })
        }
    }

    navigateToLogin() {
        if (this.userId) {

            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__FromRegistrationToHome"
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
}