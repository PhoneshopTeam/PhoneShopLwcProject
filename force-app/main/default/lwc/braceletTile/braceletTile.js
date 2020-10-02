import { LightningElement, api } from 'lwc';
export default class BraceletTile extends LightningElement {
    @api bracelet;

    get backgroundStyle() {
        return `background-image: url(${this.bracelet.Picture__c})`;
    }

    selectBracelet() {
        const braceletSelectEvent = new CustomEvent('braceletselect', { detail: { selectedBraceletId: this.bracelet.Id } });
        this.dispatchEvent(braceletSelectEvent);
    }
}