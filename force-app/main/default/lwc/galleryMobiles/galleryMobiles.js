import { LightningElement, track, api } from 'lwc';
export default class GalleryMobiles extends LightningElement {
    @track isLoading = false;
    @api userId;
    @api userName;

    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    handleChangeBrand(event) {
        const selectedBrand = event.detail.selectedBrand;
        this.template.querySelector('c-list-mobiles').inputBrand(selectedBrand);
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
        this.template.querySelector('c-list-mobiles').inputMaxPrice(maxPrice);
    }

    handleChangeOS(event) {
        const selectedOS = event.detail.selectedOS;
        this.template.querySelector('c-list-mobiles').inputOS(selectedOS);
    }
}