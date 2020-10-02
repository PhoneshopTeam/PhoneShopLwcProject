import { LightningElement, track, api } from 'lwc';
export default class GalleryBracelets extends LightningElement {
    @track isLoading = false;
    @api userId;
    @api userName;

    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    sortBracelets(event) {
        const selectedBySort = event.detail.selectedBySort;
        this.template.querySelector('c-list-bracelets').sortMobiles(selectedBySort);
    }

    handleChangeKey(event) {
        const searchKey = event.detail.searchKey;
        this.template.querySelector('c-list-bracelets').inputSearch(searchKey);
    }

    handleMaxPrice(event) {
        const maxPrice = event.detail.maxPrice;
        this.template.querySelector('c-list-bracelets').inputMaxPrice(maxPrice);
    }
}