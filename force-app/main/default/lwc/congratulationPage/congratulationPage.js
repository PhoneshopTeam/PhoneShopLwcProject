/* eslint-disable radix */
import {
    LightningElement,
    api
} from 'lwc';
import {
    NavigationMixin
} from 'lightning/navigation';
import {
    loadScript
} from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/confetti";

export default class CongratulationPage extends NavigationMixin(LightningElement) {

    @api userId;
    @api userName;

    connectedCallback() {
        Promise.all([
                loadScript(this, CONFETTI)
            ])
            .then(() => {
                this.fireworks();
            })
            .catch(error => {
                //    this.dispatchEvent(
                //        new ShowToastEvent({
                //            title: "Error",
                //            message: error.message,
                //            variant: error
                //        })
                //    );
            });
    }

    fireworks() {
        var end = Date.now() + (15 * 100);
        var interval = setInterval(function () {
            if (Date.now() > end) {
                return clearInterval(interval);
            }
            confetti({
                particleCount: 450,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: {
                    x: Math.random(),
                    y: Math.random()
                },
            });
        }, 200);
    }

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