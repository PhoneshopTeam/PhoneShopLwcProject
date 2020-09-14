import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const TOAST_TITLE = "Review Created!";
const TOAST_SUCCESS_VARIANT = "success";
export default class AddReviewForm extends LightningElement {
    @api mobileId;
    @api contactId;
    @track reviewId;
    rating;

    @api get recordId() {
        return this.mobileId;
    }
    set recordId(value) {
        this.mobileId = value;
    }

    handleRatingChange(event) {
        window.console.log('6');
        this.rating = event.detail.rating;
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Product__c = this.mobileId;
        fields.Rating__c = this.rating;
        fields.Contact__c = this.contactId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event) {
        this.reviewId = event.detail.id;
        this.dispatchEvent(new ShowToastEvent({
            title: TOAST_TITLE,
            message: TOAST_TITLE,
            variant: TOAST_SUCCESS_VARIANT
        }));
        this.dispatchEvent(new CustomEvent('createreview', {
            detail: {
                reviewId: this.reviewId
            }
        }));
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