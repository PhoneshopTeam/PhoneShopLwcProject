import {
    LightningElement,
    wire
} from 'lwc';
import getMobilesInOrder from "@salesforce/apex/MobileDataService.getMobilesInOrder";
import getDeliveryAdress from "@salesforce/apex/ContactController.getDeliveryAdress";
import getOrdersById from "@salesforce/apex/CustomOrderController.getOrdersById";
import formOrder from "@salesforce/apex/CustomOrderController.formOrder";
import getTypesOfPaymentOptions from "@salesforce/apex/CustomOrderController.getTypesOfPaymentOptions";

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    CurrentPageReference,
    NavigationMixin
} from 'lightning/navigation';
import {
    refreshApex
} from '@salesforce/apex';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ORDER_NUMBER_FIELD from '@salesforce/schema/Custom_Order__c.Order_Number__c';
import TOTAL_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';

const COLS = [{
        label: "Picture",
        fieldName: "Picture__c",
        hideDefaultActions: true,
        type: 'image'
    },
    {
        label: "Name",
        fieldName: "Name",
        hideDefaultActions: true
    },
    {
        label: "Price",
        fieldName: "Price__c",
        hideDefaultActions: true,
        type: 'currency'
    }
];

export default class Order extends NavigationMixin(LightningElement) {

    //@api
    contactId;
    //  = "0032w00000FyKrCAAV";
    //@api
    orderId;
    //  = "a002w000009jZpCAAU";
    selectedAddressId;
    orders;
    error;
    date;
    typeOfPayment;
    isHideDeliveryDate = false;
    isHidePositionsInOrder = false;
    labelOfPositionsButton = "Show all positions";

    fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];
    fieldsOfOrder = [ORDER_NUMBER_FIELD, TOTAL_AMOUNT_FIELD];

    columns = COLS;
    @wire(CurrentPageReference)
    currentPageReference;

    get orderIdFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__orderId
        );
    }
    get contactIdFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__contactId
        );
    }

    renderedCallback() {
        this.orderId = this.orderIdFromState;
        this.contactId = this.contactIdFromState;
    }

    @wire(getTypesOfPaymentOptions)
    typeOfPaymentOptions;

    @wire(getMobilesInOrder, {
        orderId: "$orderId"
    }) mobiles;

    @wire(getDeliveryAdress, {
        contactId: "$contactId"
    }) deliveryAddresses;

    @wire(getOrdersById, {
        orderId: "$orderId"
    })
    wiredOrders({
        data,
        error
    }) {
        if (data) {
            this.orders = data;
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.orders = undefined;
        }
    }

    refresh() {
        return refreshApex(this.deliveryAddresses);
    }

    get deliveryAddressesOptions() {
        const returnOptions = [];
        if (this.deliveryAddresses.data) {

            const addresses = this.deliveryAddresses.data;

            addresses.forEach(item => {
                returnOptions.push({
                    label: item.Adress__c,
                    value: item.Id
                });
            });
        }
        return returnOptions;
    }

    handleChange(event) {
        switch (event.target.dataset.id) {
            case "positions":
                this.isHidePositionsInOrder = this.isHidePositionsInOrder ? false : true;
                this.labelOfPositionsButton = this.isHidePositionsInOrder ?
                    "Hide all positions" :
                    "Show all positions";
                break;
            case "address":
                this.selectedAddressId = event.detail.value;
                break;
            case "deliveryCheckbox":
                this.isHideDeliveryDate = event.target.checked ? true : false;
                break;
            case "deliveryDate":
                this.date = event.detail.value;
                break;
            case "typeOfPayment":
                this.typeOfPayment = event.detail.value;
                break;
            default:
        }
    }

    handleSubmitForOrder() {

        if (this.typeOfPayment) {
            if (!this.isHideDeliveryDate) {
                this.formOrder();
            } else {
                if (this.selectedAddressId && this.date) {
                    this.formOrder();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Warning',
                            message: 'Please, choose date and address',
                            variant: 'warning'
                        })
                    );
                }
            }
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Warning',
                    message: 'Please, choose type of payment',
                    variant: 'warning'
                })
            );
        }
    }

    formOrder() {
        formOrder({
            deliveryDate: this.date,
            typeOfPayment: this.typeOfPayment,
            orderId: this.orderId,
            id: this.selectedAddressId,
            isHideDeliveryDate: this.isHideDeliveryDate
        }).then(() => {
            if (this.typeOfPayment === 'by card online') {
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__FromNewOrderPageToSamsungPayPage"
                    },
                    state: {
                        c__orderId: this.orderId,
                        c__contactId: this.contactId
                    }
                })
            } else {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Order updated',
                        variant: 'success'
                    })
                );
            }
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}