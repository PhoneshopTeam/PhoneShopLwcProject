import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getBraceletsList from '@salesforce/apex/ProductDataService.getBraceletsList';
import getNext from '@salesforce/apex/ProductDataService.getNext';
import getPrevious from '@salesforce/apex/ProductDataService.getPrevious';
import totalRecords from '@salesforce/apex/ProductDataService.totalRecords';
import { NavigationMixin } from 'lightning/navigation';
export default class ListMobiles extends NavigationMixin(LightningElement) {
    @track offset = 0;
    @track totalRecords;
    @track pageSize = 8;

    @api userId;

    @track selectedBraceletId;
    @track selectedBySort = '';
    @track searchKey = '';
    @track maxPrice = 0;
    @track isLoading = true;

    @wire(getBraceletsList, {
        offset: '$offset', pageSize: '$pageSize', bySort: '$selectedBySort',
        searchKey: '$searchKey', maxPrice: '$maxPrice'
    }) bracelets;

    get refresh() {
        refreshApex(this.bracelets);
        return true;
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

    notifyLoading(isLoading) {
        isLoading ? this.dispatchEvent(new CustomEvent('loading')) : this.dispatchEvent(new CustomEvent('doneloading'));
    }

    openBraceletDetailPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__FromGalleryToMobileDetails"
            },
            state: {
                c__mobileId: event.detail.selectedBraceletId,
                c__userId: this.userId
            }
        });
    }

    connectedCallback() {
        totalRecords().then(result => {
            this.totalRecords = result;
        });
    }

    previousHandler2() {
        getPrevious({
            offset: this.offset,
            pageSize: this.pageSize
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
            pageSize: this.pageSize
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