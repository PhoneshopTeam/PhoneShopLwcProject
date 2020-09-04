import { LightningElement, wire, track } from 'lwc';
import getMobileBrands from '@salesforce/apex/MobileDataService.getMobileBrands';

export default class MobileSearchForm extends LightningElement {
    selectedBrand = '';
    selectedBySort = '';

    @track error = undefined;

    @track searchOptions;
    @track sortingOptions = [
        { value: 'priceDesc', label: 'Descending price' },
        { value: 'priceAsc', label: 'Ascending price' },
        { value: 'rating', label: 'Rating' },
        { value: '', label: 'choose...' }
    ];

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
        window.console.log('1');
        this.selectedBySort = event.detail.value;
        const sortEvent = new CustomEvent('sort', {
            detail: {
                selectedBySort: this.selectedBySort
            }
        });
        this.dispatchEvent(sortEvent);
    }
}