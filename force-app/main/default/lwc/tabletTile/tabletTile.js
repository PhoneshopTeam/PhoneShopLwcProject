import { LightningElement, api } from 'lwc';
export default class TabletTile extends LightningElement {
    @api tablet;

    get backgroundStyle() {
        return `background-image: url(${this.tablet.Picture__c})`;
    }

    selectTablet() {
        const tabletSelectEvent = new CustomEvent('tabletselect', { detail: { selectedTabletId: this.tablet.Id } });
        this.dispatchEvent(tabletSelectEvent);
    }
}