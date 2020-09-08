import { LightningElement, api } from 'lwc';
export default class Gallery extends LightningElement {
    isLoading = false;
    @api contactId = '0032w00000I6h0sAAB';

    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    searchMobiles(event) {
        const selectedBrand = event.detail.selectedBrand;
        this.template.querySelector('c-list-mobiles').searchMobiles(selectedBrand);
    }

    sortMobiles(event) {
        window.console.log('2');
        const selectedBySort = event.detail.selectedBySort;
        this.template.querySelector('c-list-mobiles').sortMobiles(selectedBySort);
    }
}