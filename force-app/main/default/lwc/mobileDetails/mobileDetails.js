import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import MOBILE_ID_FIELD from '@salesforce/schema/Product2.Id';
import MOBILE_NAME_FIELD from '@salesforce/schema/Product2.Name';
import MOBILE_PICTURE_FIELD from '@salesforce/schema/Product2.Picture__c';
import MOBILE_TOTAL_QUANTITY_FIELD from '@salesforce/schema/Product2.Total_Quantity__c';
import MOBILE_PRICE_FIELD from '@salesforce/schema/Product2.Price__c';
const MOBILE_FIELDS = [MOBILE_ID_FIELD, MOBILE_NAME_FIELD, MOBILE_PICTURE_FIELD, MOBILE_TOTAL_QUANTITY_FIELD, MOBILE_PRICE_FIELD];


import ORDER_OBJECT from '@salesforce/schema/Custom_Order__c';
import ORDER_NAME_FIELD from '@salesforce/schema/Custom_Order__c.Name';
import ORDER_CONTACTID_FIELD from '@salesforce/schema/Custom_Order__c.ContactId__c';
import ORDER_STATUS_FIELD from '@salesforce/schema/Custom_Order__c.Status__c';
import ORDER_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';

import BASKET_OBJECT from '@salesforce/schema/Basket__c';
import BASKET_PRODUCTID_FIELD from '@salesforce/schema/Basket__c.ProductId__c';
import BASKET_CONTACTID_FIELD from '@salesforce/schema/Basket__c.ContactId__c';
import BASKET_ORDERID_FIELD from '@salesforce/schema/Basket__c.CustomOrderId__c';
import BASKET_STATUS_FIELD from '@salesforce/schema/Basket__c.ProductStatus__c';
import BASKET_QUANTITY_FIELD from '@salesforce/schema/Basket__c.Quantity__c';
import BASKET_UNITPRICE_FIELD from '@salesforce/schema/Basket__c.UnitPrice__c';

const REVIEWS_TAB = 'reviews';

export default class MobileDetais extends NavigationMixin(LightningElement) {
	@api contactId;
	@api mobileId = '01t2w000006P0G3AAK';
	quantity = 1;
	orderId;

	@wire(getRecord, { recordId: '$mobileId', fields: MOBILE_FIELDS })
	wiredRecord;

	get detailsTabIconName() {
		return this.wiredRecord && this.wiredRecord.data
			? 'utility:call'
			: null;
	}

	get totalQuantityValue() {
		return getFieldValue(this.wiredRecord.data, MOBILE_TOTAL_QUANTITY_FIELD);
	}

	get mobileName() {
		return getFieldValue(this.wiredRecord.data, MOBILE_NAME_FIELD);
	}

	get backgroundStyle() {
		return getFieldValue(this.wiredRecord.data, MOBILE_PICTURE_FIELD);
	}

	get mobilePrice() {
		return getFieldValue(this.wiredRecord.data, MOBILE_PRICE_FIELD);
	}

	navigateToRecordViewPage() {
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.mobileId,
				objectApiName: 'Product2',
				actionName: 'view'
			}
		});
	}

	handleReviewCreated() {
		this.template.querySelector('lightning-tabset').activeTabValue = REVIEWS_TAB;
		this.template.querySelector('c-mobile-review-list').refresh();
	}

	handleQuantityChange(event) {
		this.quantity = event.detail.value;
	}

	handleProductToBasket() {
		const fields = {};
		fields[BASKET_PRODUCTID_FIELD.fieldApiName] = this.mobileId;
		fields[BASKET_CONTACTID_FIELD.fieldApiName] = this.contactId;
		fields[BASKET_ORDERID_FIELD.fieldApiName] = 'a022w00000Eol5lAAB';//////////////////////////////
		fields[BASKET_STATUS_FIELD.fieldApiName] = false;
		fields[BASKET_QUANTITY_FIELD.fieldApiName] = this.quantity;
		fields[BASKET_UNITPRICE_FIELD.fieldApiName] = this.mobilePrice;
		const recordInput = {
			apiName: BASKET_OBJECT.objectApiName,
			fields
		}
		window.console.log('a');
		createRecord(recordInput)
			.then(basket => {
				window.console.log('b');
				window.console.log(basket.id);
				this.dispatchEvent(new ShowToastEvent({
					title: 'Success!',
					message: 'Product added to basket uccessfully!',
					variant: 'success'
				}));
			})
			.catch(error => {
				window.console.log(error);
				this.error = JSON.stringify(error);
			});
	}

	handleProductToOrder() {
		const fields = {};
		fields[ORDER_NAME_FIELD.fieldApiName] = 'Order ' + this.mobileName;
		fields[ORDER_CONTACTID_FIELD.fieldApiName] = this.contactId;
		fields[ORDER_STATUS_FIELD.fieldApiName] = 'Draft';
		fields[ORDER_AMOUNT_FIELD.fieldApiName] = this.quantity * this.mobilePrice;

		const recordInput = {
			apiName: ORDER_OBJECT.objectApiName,
			fields
		}
		createRecord(recordInput)
			.then(order => {
				/////нужна savepoint
				this.orderId = order.id;
				const fields = {};
				fields[BASKET_PRODUCTID_FIELD.fieldApiName] = this.mobileId;
				fields[BASKET_CONTACTID_FIELD.fieldApiName] = this.contactId;
				fields[BASKET_ORDERID_FIELD.fieldApiName] = this.orderId
				fields[BASKET_STATUS_FIELD.fieldApiName] = true;
				fields[BASKET_QUANTITY_FIELD.fieldApiName] = this.quantity;
				fields[BASKET_UNITPRICE_FIELD.fieldApiName] = this.mobilePrice;
				//fields[BASKET_TOTALPRICE_FIELD.fieldApiName] = this.quantity * this.mobilePrice;
				const recordInput = {
					apiName: BASKET_OBJECT.objectApiName,
					fields
				}
				window.console.log('a');
				createRecord(recordInput)
					.then(basket => {
						window.console.log('b');
						window.console.log(basket.id);
						this.dispatchEvent(new ShowToastEvent({
							title: 'Success!',
							message: 'Order ' + this.orderId + ' Created Successfully!',
							variant: 'success'
						}));
						this[NavigationMixin.Navigate]({
							type: "standard__component",
							attributes: {
								componentName: "c__FromMobileDetailsToNewOrder"
							},
							state: {
								c__orderId: this.orderId,
								c__contactId: this.contactId
							}
						})
					})
					.catch(error => {
						window.console.log(error);
						this.error = JSON.stringify(error);
					});
			})
			.catch(error => {
				window.console.log(error);
				this.error = JSON.stringify(error);
			});
	}
}