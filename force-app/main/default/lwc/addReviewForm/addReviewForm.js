import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const TOAST_TITLE = "Review Created!";
const TOAST_SUCCESS_VARIANT = "success";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_ID from "@salesforce/schema/User.ContactId";
import USER_ID from "@salesforce/user/Id";
export default class AddReviewForm extends LightningElement {
    @api mobileId;
    rating;

    @api get recordId() {
        return this.mobileId;
    }
    set recordId(value) {
        this.mobileId = value;
    }

    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] })
    user;

    @api get contactId() {
        return getFieldValue(this.user.data, CONTACT_ID);
    }

    handleRatingChange(event) {
        this.rating = event.detail.rating;
    }

    handleSubmit(event) {
        event.preventDefault();
		const fields = event.detail.fields;
		fields.Product__c = this.mobileId;
		fields.Rating__c = this.rating;
		this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess() {
        this.dispatchEvent(new ShowToastEvent({
            title: TOAST_TITLE,
            message: TOAST_TITLE,
            variant: TOAST_SUCCESS_VARIANT
        }));
       // this.dispatchEvent(new CustomEvent('createreview'));
        this.handleReset();
    }

    handleReset() {
        const inputFields = this.template.querySelectorAll("lightning-input-field");
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}