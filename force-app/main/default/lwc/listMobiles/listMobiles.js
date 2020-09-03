import { LightningElement, api, wire, track } from 'lwc';
import getMobilesList from '@salesforce/apex/MobileDataService.getMobilesList';
import getNext from '@salesforce/apex/MobileDataService.getNext';
import getPrevious from '@salesforce/apex/MobileDataService.getPrevious';
import totalRecords from '@salesforce/apex/MobileDataService.totalRecords';
import { NavigationMixin } from 'lightning/navigation';
export default class ListMobiles extends NavigationMixin(LightningElement) {
    @track offset = 0;
    @track totalRecords;
    @track pageSize = 8;

    mobiles;
    @api selectedMobileId;
    @api selectedBrand = '';
    isLoading = true;

    @wire(getMobilesList, { offset: '$offset', pageSize: '$pageSize', mobileBrand: '$selectedBrand' })
    wiredBoats(result) {
        this.mobiles = result;
    }

    @api
    searchMobiles(selectedBrand) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.selectedBrand = selectedBrand;
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    notifyLoading(isLoading) {
        isLoading ? this.dispatchEvent(new CustomEvent('loading')) : this.dispatchEvent(new CustomEvent('doneloading'));
    }

    openMobileDetailPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Product2',
                recordId: event.detail.selectedMobileId,
                actionName: 'view'
            }
        });
    }

    connectedCallback() {
        totalRecords({ mobileBrand: this.selectedBrand }).then(result => {
            this.totalRecords = result;
        });
    }

    previousHandler2() {
        getPrevious({ offset: this.offset, pageSize: this.pageSize }).then(result => {
            this.offset = result;
            if (this.offset === 0) {
                this.template.querySelector('c-paginator').changeView('trueprevious');
            } else {
                this.template.querySelector('c-paginator').changeView('falsenext');
            }
        });
    }

    nextHandler2() {
        getNext({ offset: this.offset, pageSize: this.pageSize }).then(result => {
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