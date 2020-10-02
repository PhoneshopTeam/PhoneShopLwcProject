import { LightningElement, track } from 'lwc';

export default class TabletSearchForm extends LightningElement {
    @track selectedBySort = '';
    @track searchKey = '';
    @track maxPrice;

    @track sortingOptions = [
        { value: 'priceDesc', label: 'Descending price' },
        { value: 'priceAsc', label: 'Ascending price' },
        { value: 'rating', label: 'Rating' },
        { value: '', label: 'choose...' }
    ];

    @track error = undefined;

    handleSortingOptionChange(event) {
        this.selectedBySort = event.detail.value;
        const sortEvent = new CustomEvent('sort', {
            detail: {
                selectedBySort: this.selectedBySort
            }
        });
        this.dispatchEvent(sortEvent);
    }

    handleMaxPriceChange(event) {
        const maxPrice = event.detail.value;
        if (maxPrice) {
            this.maxPrice = maxPrice;
        } else {
            this.maxPrice = 0;
        }
        const priceEvent = new CustomEvent('maxprice', {
            detail: {
                maxPrice: this.maxPrice
            }
        });
        this.dispatchEvent(priceEvent);
    }

    handleChange(event) {
        this.searchKey = event.target.value;
        event.preventDefault();
        const searchEvent = new CustomEvent('changekey', {
            detail: {
                searchKey: this.searchKey
            }
        });
        this.dispatchEvent(searchEvent);
    }
}