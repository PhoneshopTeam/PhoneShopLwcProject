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
		return this.mobileReviews ? this.mobileReviews.length > 0 : false;
	}

	@api
	refresh() {
		window.console.log('b');
		this.getReviews();
	}

	getReviews() {
		window.console.log('c');
		this.isLoading = true;
		getAllReviews({
			mobileId: this.mobileId
		})
			.then(result => {
				this.mobileReviews = result;
				window.console.log(this.mobileReviews.length);
				this.isLoading = false;
			})
			.catch(error => {
				this.error = error;
				this.isLoading = false;
			});
	}

	navigateToRecord(event) {
		const userId = event.target.dataset.recordId;

		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: userId,
				actionName: 'view'
			},
		});

	}
}