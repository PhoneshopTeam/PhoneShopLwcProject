import {
    LightningElement,
    api
} from 'lwc';

// import ORDER_Id_FIELD from '@salesforce/schema/Case.Custom_OrderId__c';
import CREATED_DATE_FIELD from '@salesforce/schema/Case.CreatedDate';
import TYPE_FIELD from '@salesforce/schema/Case.Type';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import STATUS_FIELD from '@salesforce/schema/Case.Status';

export default class ViewCaseInfo extends LightningElement {

    @api caseId;
    orderId = '11111';

    fieldsOfCase = [CREATED_DATE_FIELD, TYPE_FIELD, DESCRIPTION_FIELD, STATUS_FIELD];

    onclick() {
        console.log('onclick');
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close', {}));
    }
}