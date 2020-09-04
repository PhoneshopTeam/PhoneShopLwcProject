import { LightningElement, api } from 'lwc';
export default class MobileTile extends LightningElement {
    @api mobile;

    get backgroundStyle() {
        return `background-image: url(${this.mobile.Picture__c})`;
    }

    selectMobile(event) {
        const mobileSelectEvent = new CustomEvent('mobileselect', { detail: { selectedMobileId: this.mobile.Id } });
        this.dispatchEvent(mobileSelectEvent);
    }
}