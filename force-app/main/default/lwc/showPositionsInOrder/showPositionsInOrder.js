import {
    LightningElement,
    wire,
    api
} from 'lwc';
import getMobilesInOrder from "@salesforce/apex/MobileDataService.getMobilesInOrder";

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

export default class ShowPositionsInOrder extends LightningElement {

    labelOfPositionsButton = "Show all positions";
    isHidePositionsInOrder = false;
    columns = COLS;
    @api orderId;

    @wire(getMobilesInOrder, {
        orderId: "$orderId"
    }) mobiles;

    handleChange() {

        this.isHidePositionsInOrder = this.isHidePositionsInOrder ? false : true;
        this.labelOfPositionsButton = this.isHidePositionsInOrder ?
            "Hide all positions" :
            "Show all positions";
    }
}