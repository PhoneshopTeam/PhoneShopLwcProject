import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
export default class Gallery extends NavigationMixin(LightningElement) {
    @track userId;
    @track userName;

    @wire(CurrentPageReference)
    currentPageReference;

    get userIdFromState() {
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
        this.userId = this.userIdFromState;
        this.userName = this.userNameFromState;
    }
}