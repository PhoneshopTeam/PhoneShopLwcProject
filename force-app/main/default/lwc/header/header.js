import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

export default class Header extends NavigationMixin(LightningElement) {
    @api userId;
    @api userName;
    authLabel;

    renderedCallback() {
        this.authLabel = this.userId ? "Sign out" : "Sign in";
    }

    navigateToHome() {
        if (this.userId) {
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
        } else {
            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__ToHomePageWithoutAuthorization"
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
                    c__userId: this.userId,
                    c__userName: this.userName
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
}