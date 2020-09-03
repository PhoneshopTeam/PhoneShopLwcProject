import {
    LightningElement,
    wire,
    api
} from 'lwc';
import ORDER_NUMBER_FIELD from '@salesforce/schema/Custom_Order__c.Order_Number__c';
import TOTAL_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';
import STATUS_FIELD from '@salesforce/schema/Custom_Order__c.Status__c';
import TYPE_OF_PAYMENT_FIELD from '@salesforce/schema/Custom_Order__c.Type_of_payment__c';
import DELIVERY_DATE_FIELD from '@salesforce/schema/Custom_Order__c.Delivery_date__c';
import DELIVERY_ADDRESS_ID_FIELD from '@salesforce/schema/DeliveryAdress__c.Adress__c';
import getDeliveryAdressByOrderId from "@salesforce/apex/CustomOrderController.getDeliveryAdressByOrderId";



export default class ViewOrderInfo extends LightningElement {

    @api orderId;
    addressId;

    fieldsOfOrder = [ORDER_NUMBER_FIELD, TOTAL_AMOUNT_FIELD, STATUS_FIELD, TYPE_OF_PAYMENT_FIELD, DELIVERY_DATE_FIELD];
    fieldsOfDeliveryAdress = [DELIVERY_ADDRESS_ID_FIELD];

    @wire(getDeliveryAdressByOrderId, {
        orderId: "$orderId"
    })
    wiredAdress({
        data,
        error
    }) {
        if (data) {
            data.forEach(item => {
                this.addressId = item.Id
            });
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.deliveryAddress = undefined;
        }
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close', {}));
    }
}