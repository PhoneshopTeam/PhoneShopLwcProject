import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getMobilesList from '@salesforce/apex/ProductDataService.getMobilesList';
import getNext from '@salesforce/apex/ProductDataService.getNext';
import getPrevious from '@salesforce/apex/ProductDataService.getPrevious';
import totalRecords from '@salesforce/apex/ProductDataService.totalRecords';
import { NavigationMixin } from 'lightning/navigation';
export default class ListMobiles extends NavigationMixin(LightningElement) {
    @track offset = 0;
    @track totalRecords;
    @track pageSize = 8;

    @api userId;

    @track selectedMobileId;
    @track selectedBySort = '';
    @track searchKey = '';
    @track maxPrice = 0;
    @track selectedBrand = [];
    @track selectedOs = [];
    isLoading = true;

    @wire(getMobilesList, {
        offset: '$offset', pageSize: '$pageSize', selectedBrand: '$selectedBrand', bySort: '$selectedBySort',
        searchKey: '$searchKey', maxPrice: '$maxPrice', selectedOs: '$selectedOs'
    }) mobiles;

    get refresh() {
        refreshApex(this.mobiles);
        return true;
    }

    @api
    inputBrand(selectedBrand) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.selectedBrand = selectedBrand;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    @api
    sortMobiles(selectedBySort) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.selectedBySort = selectedBySort;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    @api
    inputSearch(searchKey) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.searchKey = searchKey;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    @api
    inputMaxPrice(maxPrice) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.maxPrice = maxPrice;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    @api
    inputOS(selectedOs) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.selectedOs = selectedOs;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    notifyLoading(isLoading) {
        isLoading ? this.dispatchEvent(new CustomEvent('loading')) : this.dispatchEvent(new CustomEvent('doneloading'));
    }

    openMobileDetailPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__FromGalleryToMobileDetails"
            },
            state: {
                c__mobileId: event.detail.selectedMobileId,
                c__userId: this.userId
            }
        });
    }

    connectedCallback() {
        totalRecords({ productType: 'mobile' })
            .then(result => {
                this.totalRecords = result;
            });
    }

    previousHandler2() {
        getPrevious({
            offset: this.offset,
            pageSize: this.pageSize,
            productType: 'mobile'
        }).then(result => {
            this.offset = result;
            if (this.offset === 0) {
                this.template.querySelector('c-paginator').changeView('trueprevious');
            } else {
                this.template.querySelector('c-paginator').changeView('falsenext');
            }
        });
    }

    nextHandler2() {
        getNext({
            offset: this.offset,
            pageSize: this.pageSize,
            productType: 'mobile'
        }).then(result => {
            this.offset = result;
            if (this.offset + 10 > this.totalRecords) {
                this.template.querySelector('c-paginator').changeView('truenext');
            } else {
                this.template.querySelector('c-paginator').changeView('falseprevious');
            }
        });
    }

    changeHandler2(event) {
        const det = event.detail;
        this.pageSize = det;
    }

    firstpagehandler() {
        this.offset = 0;
        this.template.querySelector('c-paginator').changeView('trueprevious');
        this.template.querySelector('c-paginator').changeView('falsenext');
    }

    lastpagehandler() {
        this.offset = this.totalRecords - (this.totalRecords) % (this.pageSize);
        this.template.querySelector('c-paginator').changeView('falseprevious');
        this.template.querySelector('c-paginator').changeView('truenext');
    }
}