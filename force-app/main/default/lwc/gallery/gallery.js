import {
    LightningElement,
    wire
} from 'lwc';
import {
    CurrentPageReference,
    NavigationMixin
} from 'lightning/navigation';
export default class Gallery extends NavigationMixin(LightningElement) {
    isLoading = false;
    userId;
    userName;

    @wire(CurrentPageReference)
    currentPageReference;

    get contactIdFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__userId
        );
    }
    get userNameFromState() {
        return (
            this.currentPageReference && this.currentPageReference.state.c__userName
        );
    }

    renderedCallback() {
        this.userId = this.contactIdFromState;
        this.userName = this.userNameFromState;
    }
    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    searchMobiles(event) {
        const selectedBrand = event.detail.selectedBrand;
        this.template.querySelector('c-list-mobiles').searchMobiles(selectedBrand);
    }

    sortMobiles(event) {
        window.console.log('2');
        const selectedBySort = event.detail.selectedBySort;
        this.template.querySelector('c-list-mobiles').sortMobiles(selectedBySort);
    }
}