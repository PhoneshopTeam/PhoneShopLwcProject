import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getAllReviews from '@salesforce/apex/MobileDataService.getAllReviews';

export default class MobileReviewList extends NavigationMixin(LightningElement) {
	mobileId;
	error;
	mobileReviews;
	isLoading;

	@api get recordId() {
		return this.mobileId;
	}
	set recordId(value) {
		this.mobileId = value;
		this.getReviews();
	}

	@wire(getAllReviews, { mobileId: '$mobileId' })
	wiredMobileReviews(result) {
		this.mobileReviews = result;
	}

	get reviewsToShow() {
		return this.boatReviews ? this.boatReviews.length > 0 : false;
	}

	@api
	refresh() {
		this.getReviews();
	}

	getReviews() {
		this.isLoading = true;
		getAllReviews({
			mobileId: this.mobileId
		})
			.then(result => {
				this.mobileReviews = result;
				this.isLoading = false;
			})
			.catch(error => {
				this.error = error;
				this.isLoading = false;
			});
	}

	navigateToRecord(event) {
		const contactId = event.target.dataset.recordId;

		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: contactId,
				actionName: 'view'
			},
		});

	}
}