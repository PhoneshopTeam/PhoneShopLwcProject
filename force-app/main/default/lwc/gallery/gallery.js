import { LightningElement } from 'lwc';
export default class Gallery extends LightningElement {
    isLoading = false;

    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    searchMobiles(event) {
        const selectedBrand = event.detail.selectedBrand;
        window.console.log(selectedBrand + 'gallery');
        this.template.querySelector('c-list-mobiles').searchMobiles(selectedBrand);
    }
}