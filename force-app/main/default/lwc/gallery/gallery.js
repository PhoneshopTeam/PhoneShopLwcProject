import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
export default class Gallery extends NavigationMixin(LightningElement) {
    isLoading = false;
    contactId = '0032w00000I6h0uAAB';

    @wire(CurrentPageReference)
    currentPageReference;

    get contactIdFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__contactId
        );
    }

    /*renderedCallback() {
        this.contactId = this.contactIdFromState;
    }*/

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
        const selectedBySort = event.detail.selectedBySort;
        this.template.querySelector('c-list-mobiles').sortMobiles(selectedBySort);
    }

    handleChangeKey(event) {
        const searchKey = event.detail.searchKey;
        this.template.querySelector('c-list-mobiles').inputSearch(searchKey);
    }

    handleMaxPrice(event) {
        const maxPrice = event.detail.maxPrice;
        this.template.querySelector('c-list-mobiles').inputSearch(maxPrice);
    }
}