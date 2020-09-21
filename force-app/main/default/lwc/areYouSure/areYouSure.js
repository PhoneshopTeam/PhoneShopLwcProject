import { LightningElement } from 'lwc';

export default class AreYouSure extends LightningElement {

    handleNo() {
        const handleNo = new CustomEvent('noclick');
        console.log(' handleNoEvent block ------------------');
        this.dispatchEvent(handleNo);
    }

    handleYes() {
        const handleYes = new CustomEvent('yesclick');
        console.log(' handleYesEvent block ------------------');
        this.dispatchEvent(handleYes);
    }
}