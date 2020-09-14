import { LightningElement, wire, track } from 'lwc';
import getMobileBrands from '@salesforce/apex/MobileDataService.getMobileBrands';

export default class MobileSearchForm extends LightningElement {
    @track selectedBrand = '';
    @track selectedBySort = '';
    @track searchKey = '';
    @track maxPrice = 0;

    @track searchOptions;
    @track sortingOptions = [
        { value: 'priceDesc', label: 'Descending price' },
        { value: 'priceAsc', label: 'Ascending price' },
        { value: 'rating', label: 'Rating' },
        { value: '', label: 'choose...' }
    ];

    @track error = undefined;

    @wire(getMobileBrands, {
        objInfo: { 'sobjectType': 'Product2' },
        picklistFieldApi: 'Brand__c'
    })
    mobileBrands({ error, data }) {
        if (data) {
            this.searchOptions = data.map(type => {
                return {
                    label: type.slabel,
                    value: type.svalue
                };
            });
            this.searchOptions.unshift({ label: 'All Brands', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    handleSearchOptionChange(event) {
        this.selectedBrand = event.detail.value;
        const searchBrandEvent = new CustomEvent('searchbrand', {
            detail: {
                selectedBrand: this.selectedBrand
            }
        });
        this.dispatchEvent(searchBrandEvent);
    }

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
        this.maxPrice = event.detail.value;
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