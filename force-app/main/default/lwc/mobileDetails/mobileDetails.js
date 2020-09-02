import {
	LightningElement,
	wire,
	api
} from 'lwc';
import {
	NavigationMixin
} from 'lightning/navigation';
import {
	getRecord,
	getFieldValue,
	createRecord
} from 'lightning/uiRecordApi';
import updateProductOrderId from '@salesforce/apex/MobileDataService.updateProductOrderId';
import {
	ShowToastEvent
} from 'lightning/platformShowToastEvent';

import MOBILE_ID_FIELD from '@salesforce/schema/Product2.Id';
import MOBILE_NAME_FIELD from '@salesforce/schema/Product2.Name';
import MOBILE_PICTURE_FIELD from '@salesforce/schema/Product2.Picture__c';
import MOBILE_TOTAL_QUANTITY_FIELD from '@salesforce/schema/Product2.Total_Quantity__c';
// import MOBILE_ACCOUNT_FIELD from '@salesforce/schema/Product2.Account__c';
import MOBILE_PRICE_FIELD from '@salesforce/schema/Product2.Price__c';
const MOBILE_FIELDS = [MOBILE_ID_FIELD, MOBILE_NAME_FIELD, MOBILE_PICTURE_FIELD, MOBILE_TOTAL_QUANTITY_FIELD, MOBILE_PRICE_FIELD];


import ORDER_OBJECT from '@salesforce/schema/Custom_Order__c';
import ORDER_NAME_FIELD from '@salesforce/schema/Custom_Order__c.Name';
// import ORDER_ACCOUNTID_FIELD from '@salesforce/schema/Custom_Order__c.AccountId__c';
import ORDER_CONTACTID_FIELD from '@salesforce/schema/Custom_Order__c.ContactId__c';
// import ORDER_QUANTITY_FIELD from '@salesforce/schema/Custom_Order__c.Quantity__c';
import ORDER_STATUS_FIELD from '@salesforce/schema/Custom_Order__c.Status__c';
import ORDER_AMOUNT_FIELD from '@salesforce/schema/Custom_Order__c.Total_Amount__c';
// import ORDER_PRICE_FIELD from '@salesforce/schema/Custom_Order__c.Unit_Price__c';

const REVIEWS_TAB = 'reviews';

export default class MobileDetais extends NavigationMixin(LightningElement) {

	@api contactId;
	@api mobileId = '01t2w000006P0G3AAK';
	quantity = 1;
	orderId;

	@wire(getRecord, {
		recordId: '$mobileId',
		fields: MOBILE_FIELDS
	})
	wiredRecord;

	get detailsTabIconName() {
		return this.wiredRecord && this.wiredRecord.data ?
			'utility:call' :
			null;
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
		const productToBasketEvent = new CustomEvent('producttobasket', {
			detail: {
				product2Id: this.mobileId
			}
		});
		this.dispatchEvent(productToBasketEvent);
	}

	handleProductToOrder() {
		const fields = {};
		fields[ORDER_NAME_FIELD.fieldApiName] = 'Order ' + this.mobileName;
		// fields[ORDER_ACCOUNTID_FIELD.fieldApiName] = getFieldValue(this.wiredRecord.data, MOBILE_ACCOUNT_FIELD);
		fields[ORDER_CONTACTID_FIELD.fieldApiName] = this.contactId;
		// fields[ORDER_QUANTITY_FIELD.fieldApiName] = this.quantity;
		fields[ORDER_STATUS_FIELD.fieldApiName] = 'Draft';
		// fields[ORDER_PRICE_FIELD.fieldApiName] = this.mobilePrice;
		fields[ORDER_AMOUNT_FIELD.fieldApiName] = this.quantity * this.mobilePrice;

		const recordInput = {
			apiName: ORDER_OBJECT.objectApiName,
			fields
		}
		createRecord(recordInput)
			.then(order => {
				/////нужна savepoint
				this.orderId = order.id;
				window.console.log('button2___');
				updateProductOrderId({
						mobileId: this.mobileId,
						orderId: this.orderId
					})

					.then(() => {
						window.console.log('button2___');
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
				window.console.log(error);
			});
	}
}